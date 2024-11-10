"use client";

import { IPostDocument } from "@/mongodb/models/post.models";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { comment } from "postcss";
import ReactTimeago from "react-timeago";
import { Badge } from "./ui/badge";
import VerifiedBadge from "./instagram-verified-badge";

const CommentFeed = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const isAuthor = user?.id === post.user.userId;
  return (
    <div className="space-y-2 mt-3">
      {post.comments?.map((comment) => (
        <div key={String(comment._id)} className="flex space-x-1">
          <Avatar>
            <AvatarImage src={comment.user.userImage} />
            <AvatarFallback>
              {comment.user.firstName.charAt(0)}
              {comment.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="bg-white  px-4 py-2 rounded-md w-full sm:w-auto md:min-w-[300px]">
            <div className=" flex justify-between">
              <div className="font-semibold">
                <div className=" flex justify-betweens items-center text-sm  ">
                  {comment.user.firstName}
                  <VerifiedBadge
                    className="md:ml-2  md:mr-2 ml-[2px] "
                    size={13}
                  />
                </div>
                {/* <Badge
                  className={`ml-2 inline-block px-2 py-1 rounded-full text-xs ${
                    isAuthor
                      ? "bg-green-500 text-white mx-1"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {isAuthor && "Author"}
                </Badge> */}
                <p className=" text-xs text-gray-400">
                  @{comment.user.firstName}
                  {comment.user.lastName}-
                  {comment.user.userId.toString().slice(-4)}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm bg-white p-2 rounded-full">
              {comment.text.charAt(0).toUpperCase() + comment.text.slice(1)}
            </p>
            <p className="text-[10px] my-1  text-gray-900">
              <ReactTimeago date={new Date(comment.createdAt)} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentFeed;
