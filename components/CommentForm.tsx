'use client';

import createCommentAction from '@/actions/createCommentAction';
import { useUser } from '@clerk/nextjs';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const CommentForm = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);
  const [comment, setComment] = useState('');

  const handleCommentAction = async (formData: FormData): Promise<void> => {
    if (!user?.id) throw new Error('User not authenticated');

    ref.current?.reset();
    setComment('');

    try {
      await createCommentAction(postId, formData);
    } catch (error) {
      console.error(`Error creating comment: ${error}`);
    }
  };

  return (
    <form
      ref={ref}
      action={formData => {
        const promise = handleCommentAction(formData);
        toast.promise(promise, {
          loading: 'Creating comment',
          success: 'Comment created',
          error: 'Failed to create comment',
        });
      }}
      className="flex items-start gap-2"
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback className="text-xs">
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 items-center border border-gray-300 rounded-full pl-4 pr-1 py-0.5 bg-white focus-within:border-gray-500 transition-colors">
        <input
          type="text"
          name="commentInput"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment…"
          className="outline-none flex-1 text-sm bg-transparent py-1.5"
        />
        <button
          type="submit"
          disabled={!comment}
          className="ml-2 px-3 py-1.5 rounded-full text-sm font-semibold text-blue-600 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
