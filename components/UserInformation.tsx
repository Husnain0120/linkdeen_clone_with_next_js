// components/UserInformation.tsx
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { IPostDocument } from "@/mongodb/models/post.models";
import UserRadialChart from "@/components/RadialChart_User";

const UserInformation = async ({ posts }: { posts: IPostDocument[] }) => {
  const user = await currentUser();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  const userPosts = posts?.filter((post) => post.user.userId === user?.id);
  const userComments = posts.flatMap((post) =>
    post?.comments?.filter((comment) => comment.user.userId === user?.id || [])
  );

  const postsCount = userPosts.length;
  const commentsCount = userComments.length;

  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <Avatar>
        {user?.id ? (
          <AvatarImage src={imageUrl} />
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" />
        )}
        <AvatarFallback>
          {firstName?.charAt(0)}
          {lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <SignedIn>
        <div className="text-center">
          <p className="font-semibold">
            {firstName} {lastName}
          </p>
          <p className="text-xs flex items-center justify-center">
            @{firstName}
            {lastName}-{user?.id?.slice(-4)}
            {/* Twitter/Instagram-like Golden Badge */}
            <svg
              className="w-3 h-3 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FFD700" // Golden fill
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.25 8.75l-6.547 8.292a.75.75 0 01-1.155.035L6.75 13.75l-.943-.942a.75.75 0 011.086-1.036l.643.643L9.75 12.25l6.5-5.25a.75.75 0 011.136.057l.864 1.193a.75.75 0 01-.307 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold">You are Not signed in</p>
          <Button asChild className="bg-blue-600 text-white text-sm py-1 px-2">
            <SignInButton>Sign in</SignInButton>
          </Button>
          <Button asChild className="bg-blue-600 text-white text-sm py-1 px-2">
            <SignUpButton>Sign up</SignUpButton>
          </Button>
        </div>
      </SignedOut>

      <hr className="w-full border-gray-300 my-5" />

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Posts</p>
        <p className="text-blue-400">{postsCount}</p>
      </div>

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Comments</p>
        <p className="text-blue-400">{commentsCount}</p>
      </div>

      {/* Display the radial chart with posts and comments data */}
      <UserRadialChart postsCount={postsCount} commentsCount={commentsCount} />
    </div>
  );
};

export default UserInformation;
