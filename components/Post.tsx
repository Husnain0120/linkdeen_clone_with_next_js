"use client";

import { IPostDocument } from "@/mongodb/models/post.models";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import VerifiedBadge from "./instagram-verified-badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import { LucideTrash } from "lucide-react";
import { deletePostAction } from "@/actions/deletePostAction";
import Image from "next/image";
import PostOptions from "./PostOptions";
import { toast } from "sonner";

const Post = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const isAuthor = user?.id === post.user.userId;
  // const isVerified = post.user.isVerified; // Use the correct syntax

  return (
    <div className="bg-white rounded-md border">
      <div className="p-4 flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage
              src={post.user.userImage}
              alt={`${post.user.firstName} ${post.user.lastName}`}
            />
            <AvatarFallback>
              {post.user.firstName?.charAt(0)}
              {post.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between flex-1">
          <div>
            <div className="font-semibold flex items-center justify-start md:text-lg text-[13px]">
              {post.user.firstName} <VerifiedBadge className="ml-1" size={15} />
              {isAuthor && (
                <Badge className="ml-2" variant={"secondary"}>
                  Author
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-400">
              @{post.user.firstName} {post.user.lastName}-
              {post.user.userId.toString().slice(-4)}
            </p>
            <p className="text-xs text-gray-400">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
          {isAuthor && (
            <Button
              variant={"outline"}
              onClick={() => {
                //delete post
                const promise = deletePostAction(post._id.toString());
                toast.promise(promise, {
                  loading: "Deleting post...",
                  success: "Post Deleted successfully",
                  error: "Failed to delete post",
                });
              }}
            >
              <LucideTrash />
            </Button>
          )}
        </div>
      </div>
      <div>
        <p className=" px-4 pb-4 mt-2">{post.text}</p>
        {/* if image uploaded, put it here */}
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="post image"
            width={500}
            height={500}
            className="w-full mx-auto rounded-sm "
          />
        )}
      </div>
      {/* postOptions */}
      <PostOptions post={post} />
    </div>
  );
};

export default Post;
