"use client";

import { IPostDocument } from "@/mongodb/models/post.models";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route";
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";

import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";
import { toast } from "sonner";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "./ui/drawer"; // Drawer imports
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog"; // Import DialogTitle for accessibility

const PostOptions = ({ post }: { post: IPostDocument }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false); // Drawer toggle state
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const [likes, setLikes] = useState<string[]>(
    Array.isArray(post.likes) ? post.likes : post.likes ? [post.likes] : [] // Normalize post.likes to always be an array
  );

  const isAuthor = user?.id === post.user.userId;

  useEffect(() => {
    if (user?.id && likes.includes(user.id)) {
      setLiked(true);
    }
  }, [likes, user]);

  const likeOrUnlikePost = async () => {
    if (!user?.id) {
      toast.error("First login/signup to like post");
      return;
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes.filter((like) => like !== user.id)
      : [...likes, user.id];

    const body: LikePostRequestBody | UnlikePostRequestBody = {
      userId: user.id,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const response = await fetch(
      `/api/posts/${post._id}/${liked ? "unlike" : "like"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to like or unlike post");
    }

    const fetchLikesResponse = await fetch(`/api/posts/${post._id}/like`);

    if (!fetchLikesResponse.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to fetch likes");
    }

    const newLikeData = await fetchLikesResponse.json();
    setLikes(newLikeData);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <div>
          {likes.length > 0 && (
            <p className="text-xs text-gray-500 cursor-pointer hover:underline">
              {likes.length} likes
            </p>
          )}
        </div>

        <div>
          {post?.comments && post.comments.length > 0 && (
            <p
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="text-xs text-gray-600 cursor-pointer hover:underline"
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>

      <div className="flex p-2 justify-between px-2 border-t">
        <Button
          variant={"ghost"}
          className="postButton"
          onClick={() => {
            const promise = likeOrUnlikePost();
            isAuthor &&
              toast.promise(promise, {
                loading: liked ? "Unliking post... " : "Liking post....",
                success: liked
                  ? "Post unliked successfully"
                  : "Post liked successfully",
                error: liked ? "Failed to unlike post" : "Failed to like post",
              });
          }}
        >
          <ThumbsUpIcon
            className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")}
          />
          Like
        </Button>

        <Drawer open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
          <DrawerTrigger asChild>
            <Button variant={"ghost"} className="postButton">
              <MessageCircle
                className={cn(
                  "mr-1",
                  isCommentsOpen && "text-gray-600  fill-gray-600"
                )}
              />
              Comment
            </Button>
          </DrawerTrigger>

          <DrawerContent className="p-4 h-[75vh] flex flex-col fixed bottom-0 left-0 right-0 max-h-[75vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              {/* Centered title and added DialogTitle for accessibility */}
              <DialogTitle asChild>
                <h2 className="text-lg font-bold text-orange-600 text-center flex-1">
                  Comments
                </h2>
              </DialogTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => setIsCommentsOpen(false)}
                >
                  Close
                </Button>
              </DrawerClose>
            </div>

            {/* Scrollable comment feed */}
            <div className="flex-1 overflow-y-auto mb-4">
              <CommentFeed post={post} />
            </div>

            {/* Fixed comment form at the bottom */}
            <div className="border-t pt-4">
              <SignedIn>
                <CommentForm postId={post._id.toString()} />
              </SignedIn>
              <SignedOut>
                <p className="text-center text-sm text-gray-600 font-medium">
                  Please Login/Signup to Comment
                </p>
              </SignedOut>
            </div>
          </DrawerContent>
        </Drawer>

        <Button variant={"ghost"} className="postButton">
          <Repeat2 className="mr-1" />
          Repost
        </Button>

        <Button className="postButton" variant={"ghost"}>
          <Send className="mr-1 hidden sm:block" />
          <span className="hidden sm:block"> Send</span>
        </Button>
      </div>
    </div>
  );
};

export default PostOptions;
