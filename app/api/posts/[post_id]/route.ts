import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET method to fetch a post
export async function GET(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  try {
    // Ensure params are correctly accessed
    const postId = params.post_id;

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the post" },
      { status: 500 }
    );
  }
}

// Interface for the request body
export interface DeletePostRequestBody {
  userId: string;
}

// DELETE method to delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  // Extract the userId from Clerk's authentication
  const { userId: authUserId } = getAuth(request);

  // If user is not authenticated, return a 401 Unauthorized response
  if (!authUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  // Parse the request body to get the userId that made the delete request
  const { userId: bodyUserId }: DeletePostRequestBody = await request.json();

  // Ensure the user trying to delete the post is the same as the authenticated user
  if (bodyUserId !== authUserId) {
    return NextResponse.json(
      { error: "Unauthorized - You can only delete your own posts" },
      { status: 403 }
    );
  }

  try {
    // Ensure params are accessed correctly
    const postId = params.post_id;

    // Find and delete the post
    const post = await Post.findById(postId);

    // If post not found, return 404
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete the post and return success message
    await post.removePost();
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the post" },
      { status: 500 }
    );
  }
}
