import PostForm from "@/components/PostForm";
import { SignedIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <span>
      <SignedIn>
        <PostForm />
      </SignedIn>
    </span>
  );
};

export default page;
