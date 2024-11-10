import PostForm from "@/components/PostForm";
import { SignedIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div>
      <SignedIn>
        <PostForm />
      </SignedIn>
    </div>
  );
};

export default page;
