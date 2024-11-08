import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/mongodb/db";
import { ICommentBase } from "@/mongodb/models/comment.models";
import { Post } from "@/mongodb/models/post.models";
import { IUser } from "@/types/user.type";

// GET handler for fetching comments on a post
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Extract post_id from the request URL
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("post_id"); // Get post_id from the URL parameters

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is missing" },
        { status: 400 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comments = await post.getAllComments();
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching comments" },
      { status: 500 }
    );
  }
}

// POST handler for adding a comment to a post
export interface AddCommentRequestBody {
  user: IUser;
  text: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Extract post_id from the request URL
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("post_id");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is missing" },
        { status: 400 }
      );
    }

    const { user, text }: AddCommentRequestBody = await request.json();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment: ICommentBase = {
      user,
      text,
    };

    await post.commentOnPost(comment);
    return NextResponse.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "An error occurred while adding the comment" },
      { status: 500 }
    );
  }
}
