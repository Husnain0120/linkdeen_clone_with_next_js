"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-float">
        <SignIn afterSignOutUrl={"/"} />
      </div>
    </div>
  );
}
