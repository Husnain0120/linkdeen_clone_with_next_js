// mongodb/models/comment.models.ts
import { IUser } from '@/types/user.type';
import mongoose, { Document, models, Schema } from 'mongoose';

export interface ICommentBase {
  user: IUser;
  text: string;
}

export interface IComment extends Document, ICommentBase {
  createdAt: Date;
  updatedAt: Date;
}

const CommentsSchema = new Schema<IComment>(
  {
    user: {
      userId: { type: String, required: true },
      // ✅ required hatao — empty allowed
      userImage: { type: String, default: '' },
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Comment =
  models.Comment || mongoose.model<IComment>('Comment', CommentsSchema);
