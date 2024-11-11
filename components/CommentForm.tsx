"use client";

import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import createCommentAction from "@/actions/createCommentAction";
import { toast } from "sonner";

const CommentForm = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);
  const [comment, setComment] = useState(""); // Track comment input

  const handleCommentAction = async (formData: FormData): Promise<void> => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    // Reset the form after submission
    ref.current?.reset();
    setComment(""); // Clear comment state

    try {
      // Call the server action with the correct parameters
      await createCommentAction(postId, formData);
    } catch (error) {
      console.error(`Error creating comment: ${error}`);
    }
  };

  return (
    <form
      ref={ref}
      action={(formData) => {
        const promise = handleCommentAction(formData);

        // Handle toasts or loading states
        toast.promise(promise, {
          loading: "Creating comment",
          success: "Comment created",
          error: "Failed to create comment",
        });
      }}
      className="flex items-center space-x-2" // Added spacing between items
    >
      <Avatar>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 items-center bg-white border rounded-full px-3 py-2">
        <input
          type="text"
          name="commentInput"
          value={comment}
          onChange={(e) => setComment(e.target.value)} // Track the input value
          placeholder="Add a comment . . ."
          className="outline-none flex-1 text-sm bg-transparent"
        />
        <button
          type="submit"
          className={`ml-2 text-blue-500 text-sm font-medium transition-all ${
            comment ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`} // Disable and fade button when no text
          disabled={!comment} // Disable if the comment is empty
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
