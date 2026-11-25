'use client';

import { LikePostRequestBody } from '@/app/api/posts/[post_id]/like/route';
import { UnlikePostRequestBody } from '@/app/api/posts/[post_id]/unlike/route';
import { cn } from '@/lib/utils';
import { IPostDocument } from '@/mongodb/models/post.models';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { MessageCircle, Repeat2, Send, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CommentFeed from './CommentFeed';
import CommentForm from './CommentForm';
import { Button } from './ui/button';

const PostOptions = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [likes, setLikes] = useState<string[]>(
    Array.isArray(post.likes) ? post.likes : post.likes ? [post.likes] : []
  );

  useEffect(() => {
    setLiked(!!user?.id && likes.includes(user.id));
  }, [likes, user?.id]);

  const likeOrUnlikePost = async () => {
    if (!user?.id) throw new Error('Not authenticated');

    const willLike = !liked;
    const originalLiked = liked;
    const originalLikes = likes;

    // Optimistic update
    setLiked(willLike);
    setLikes(
      willLike ? [...likes, user.id] : likes.filter(id => id !== user.id)
    );

    try {
      const body: LikePostRequestBody | UnlikePostRequestBody = {
        userId: user.id,
      };

      const res = await fetch(
        `/api/posts/${post._id}/${willLike ? 'like' : 'unlike'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error('Failed to update like');

      const likesRes = await fetch(`/api/posts/${post._id}/like`);
      if (!likesRes.ok) throw new Error('Failed to fetch likes');

      const newLikes = await likesRes.json();
      setLikes(newLikes);
    } catch (err) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw err;
    }
  };

  const handleLikeClick = () => {
    if (!user?.id) {
      toast.error('Please login to like this post');
      return;
    }
    const promise = likeOrUnlikePost();
    toast.promise(promise, {
      loading: liked ? 'Unliking post...' : 'Liking post...',
      success: liked ? 'Post unliked' : 'Post liked',
      error: liked ? 'Failed to unlike post' : 'Failed to like post',
    });
  };

  const commentCount = post.comments?.length ?? 0;
  const isCommentsVisible = showComments || commentCount > 0;

  return (
    <div>
      {/* Stats row */}
      {(likes.length > 0 || commentCount > 0) && (
        <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-t border-gray-100">
          <div>
            {likes.length > 0 && (
              <span>
                {likes.length} {likes.length === 1 ? 'like' : 'likes'}
              </span>
            )}
          </div>
          <div>
            {commentCount > 0 && (
              <button
                onClick={() => setShowComments(true)}
                className="hover:text-gray-700 hover:underline transition-colors"
              >
                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-4 gap-1 px-2 py-1.5 border-t border-gray-100">
        <Button
          variant="ghost"
          onClick={handleLikeClick}
          className={cn(
            'h-9 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors',
            liked && 'text-blue-600'
          )}
        >
          <ThumbsUp
            className={cn(
              'mr-1.5 h-4 w-4 transition-transform',
              liked && 'fill-blue-600 text-blue-600 scale-110'
            )}
          />
          <span className="text-xs font-medium hidden sm:inline">
            {liked ? 'Liked' : 'Like'}
          </span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => setShowComments(v => !v)}
          className={cn(
            'h-9 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors',
            showComments && 'text-gray-900 bg-gray-50'
          )}
        >
          <MessageCircle
            className={cn(
              'mr-1.5 h-4 w-4 transition-transform',
              showComments && 'fill-gray-900 text-gray-900'
            )}
          />
          <span className="text-xs font-medium hidden sm:inline">Comment</span>
        </Button>

        <Button
          variant="ghost"
          className="h-9 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Repeat2 className="mr-1.5 h-4 w-4" />
          <span className="text-xs font-medium hidden sm:inline">Repost</span>
        </Button>

        <Button
          variant="ghost"
          className="h-9 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Send className="mr-1.5 h-4 w-4" />
          <span className="text-xs font-medium hidden sm:inline">Send</span>
        </Button>
      </div>

      {/* 🟦 Inline Comments section (LinkedIn-style, no drawer) */}
      {isCommentsVisible && (
        <div className="border-t border-gray-100 bg-white px-4 pt-3 pb-3">
          <SignedIn>
            <CommentForm postId={post._id.toString()} />
          </SignedIn>
          <SignedOut>
            <p className="text-center text-sm text-gray-500 font-medium py-2">
              Please{' '}
              <span className="text-blue-600 hover:underline cursor-pointer">
                login
              </span>{' '}
              or{' '}
              <span className="text-blue-600 hover:underline cursor-pointer">
                signup
              </span>{' '}
              to comment
            </p>
          </SignedOut>

          {commentCount > 0 && (
            <div className="mt-3">
              <CommentFeed post={post} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostOptions;
