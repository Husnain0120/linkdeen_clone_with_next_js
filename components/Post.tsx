'use client';

import { deletePostAction } from '@/actions/deletePostAction';
import { IPostDocument } from '@/mongodb/models/post.models';
import { useUser } from '@clerk/nextjs';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import ReactTimeago from 'react-timeago';
import { toast } from 'sonner';
import VerifiedBadge from './instagram-verified-badge';
import PostOptions from './PostOptions';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

/* ---------- Hashtag renderer ---------- */
// Matches #word, #word_123, unicode letters too (#नमस्ते, #مرحبا)
const HASHTAG_REGEX = /(#[^\s#@.,!?;:()\[\]{}"'“”‘’]+)/g;

function renderTextWithHashtags(text: string) {
  // Split keeps the delimiters (hashtags) in the output array
  const parts = text.split(HASHTAG_REGEX);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith('#')) {
      const tag = part.slice(1);
      return (
        <Link
          key={i}
          href={`/hashtag/${encodeURIComponent(tag)}`}
          className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
          onClick={e => e.stopPropagation()}
        >
          {part}
        </Link>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const isAuthor = user?.id === post.user.userId;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    const promise = deletePostAction(post._id.toString()).finally(() =>
      setDeleting(false)
    );
    toast.promise(promise, {
      loading: 'Deleting post...',
      success: 'Post deleted successfully',
      error: 'Failed to delete post',
    });
  };

  const initials =
    `${post.user.firstName?.[0] ?? ''}${post.user.lastName?.[0] ?? ''}` || '?';

  // Memoize so we don't re-render text on unrelated state changes
  const textContent = useMemo(
    () => (post.text ? renderTextWithHashtags(post.text) : null),
    [post.text]
  );

  return (
    <article className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header */}
      <header className="flex items-start gap-3 p-4 pb-2">
        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm shrink-0">
          <AvatarImage
            src={post.user.userImage}
            alt={`${post.user.firstName} ${post.user.lastName}`}
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm md:text-base text-gray-900 truncate">
              {post.user.firstName} {post.user.lastName}
            </span>
            <VerifiedBadge size={14} />
            {isAuthor && (
              <Badge
                variant="secondary"
                className="ml-0.5 text-[10px] px-1.5 py-0 h-4 font-medium"
              >
                Author
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
            <span className="truncate">
              @{post.user.firstName}
              {post.user.lastName}-{post.user.userId.toString().slice(-4)}
            </span>
            <span className="text-gray-300">·</span>
            <span className="whitespace-nowrap">
              <ReactTimeago date={new Date(post.createdAt)} />
            </span>
          </div>
        </div>

        {isAuthor && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Delete post"
            className="h-8 w-8 shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </header>

      {/* Text with hashtag highlighting */}
      {textContent && (
        <p className="px-4 pb-3 text-sm md:text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
          {textContent}
        </p>
      )}

      {/* Image */}
      {post.imageUrl && (
        <div className="w-full bg-gray-50 overflow-hidden">
          <Image
            src={post.imageUrl}
            alt="post image"
            width={1000}
            height={1000}
            className="w-full h-auto max-h-[600px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Options */}
      <PostOptions post={post} />
    </article>
  );
};

export default Post;
