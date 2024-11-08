"use client";

import { IPostDocument } from "@/mongodb/models/post.models";
import { SignedIn, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route";
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";

import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const PostOptions = ({ post }: { post: IPostDocument }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { user } = useUser();
  const [liked, setLiked] = useState(false);

  // Ensure likes is an array of strings
  const [likes, setLikes] = useState<string[]>(
    Array.isArray(post.likes) ? post.likes : post.likes ? [post.likes] : [] // Normalize post.likes to always be an array
  );

  // Check if the current user is the author of the post
  const isAuthor = user?.id === post.user.userId;

  useEffect(() => {
    if (user?.id && likes.includes(user.id)) {
      setLiked(true);
    }
  }, [likes, user]);

  const likeOrUnlikePost = async () => {
    if (!user?.id) {
      // If user is not authenticated, show a toast and exit the function
      toast.error("First login/signup to like post");
      return;
    }

    // Store the original like status and likes list to handle errors and revert if needed
    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes.filter((like) => like !== user.id) // Remove user from likes if unliking
      : [...likes, user.id]; // Add user to likes if liking

    const body: LikePostRequestBody | UnlikePostRequestBody = {
      userId: user.id,
    };

    setLiked(!liked); // Toggle liked state
    setLikes(newLikes); // Update likes state

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
      // Revert likes if the request fails
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

    // If the post is authored by the logged-in user, show a success toast directly
    if (isAuthor) {
      toast.success("Post liked successfully");
    }
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
            // isAuthor &&
            //   toast.promise(promise, {
            //     loading: liked ? "Unliking post... " : "Liking post....",
            //     success: liked
            //       ? "Post unliked successfully"
            //       : "Post liked successfully",
            //     error: liked ? "Failed to unlike post" : "Failed to like post",
            //   });
            // {
            //   !isAuthor && redirect("/sign-up");
            // }
          }}
        >
          <ThumbsUpIcon
            className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")}
          />
          Like
        </Button>

        <Button
          variant={"ghost"}
          className="postButton"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          <MessageCircle
            className={cn(
              "mr-1",
              isCommentsOpen && "text-gray-600 fill-gray-600"
            )}
          />
          Comment
        </Button>

        <Button variant={"ghost"} className="postButton">
          <Repeat2 className="mr-1" />
          Repost
        </Button>

        <Button className="postButton  " variant={"ghost"}>
          <Send className="mr-1 hidden sm:block" />

          <span className="hidden sm:block"> Send</span>
        </Button>
      </div>
      {isCommentsOpen && (
        <div className="p-4">
          <SignedIn>
            <CommentForm postId={post._id.toString()} />
          </SignedIn>

          <CommentFeed post={post} />
        </div>
      )}
    </div>
  );
};

export default PostOptions;
