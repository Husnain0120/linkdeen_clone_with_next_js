import connectDB from "@/mongodb/db";
import { ICommentBase } from "@/mongodb/models/comment.models";
import { Post } from "@/mongodb/models/post.models";
import { IUser } from "@/types/user.type";
import { NextResponse } from "next/server";

// GET handler for fetching comments on a post
export async function GET(
  request: Request,
  { params }: { params: { post_id: string } } // Explicitly typing params
) {
  try {
    await connectDB();

    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comments = await post.getAllComments();
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while fetching comments",
      },
      { status: 500 }
    );
  }
}

// POST handler for adding a comment to a post
export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } } // Explicitly typing params
) {
  await connectDB();
  const { user, text }: AddCommentRequestBody = await request.json();
  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json(
        {
          error: "Post is not found",
        },
        { status: 404 }
      );
    }

    const comment: ICommentBase = {
      user,
      text,
    };
    await post.commentOnPost(comment);
    return NextResponse.json({ message: "Comment added successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while adding comment" },
      { status: 500 }
    );
  }
}
