// File: ReloadPostsButton.tsx
"use client"; // Mark as a Client Component

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Client-side function to reload the page
const ReloadPostsButton = () => {
  const reloadPosts = () => {
    toast.loading("Reloading posts...");

    // Simulate reloading by triggering the window reload
    window.location.reload(); // Reload the page to fetch new posts
  };

  return (
    <div className="flex justify-center px-4">
      <Button variant="outline" onClick={reloadPosts}>
        Reload Posts
      </Button>
    </div>
  );
};

export default ReloadPostsButton;
