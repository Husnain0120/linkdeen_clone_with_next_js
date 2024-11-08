"use client";

import { useUser } from "@clerk/nextjs";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import createCommentAction from "@/actions/createCommentAction";
import { toast } from "sonner";

const CommentForm = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);

  const handleCommentAction = async (formData: FormData): Promise<void> => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    // Reset the form after submission
    ref.current?.reset();

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

        // Here you can handle toasts or loading states
        toast.promise(promise, {
          loading: "Createing comment",
          success: "Comment created",
          error: "Failed to create comment",
        });
      }}
      className="flex items-center space-x-1"
    >
      <Avatar>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className=" flex flex-1 bg-white border rounded-full px-3 py-3">
        <input
          type="text"
          name="commentInput"
          placeholder="Add a comment . . ."
          className=" outline-none flex-1 text-sm bg-transparent "
        />
        <button type="submit" hidden>
          Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
