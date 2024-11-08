import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post.models";
import { NextResponse } from "next/server";

// Interface for the request body
export interface UnlikePostRequestBody {
  userId: string;
}

// POST method to unlike a post
export async function POST(request: Request) {
  await connectDB();

  try {
    // Extract the post_id from the URL path using request.url
    const url = new URL(request.url); // Create a URL object from the request URL
    const postId = url.pathname.split("/")[3]; // Extract post_id from the pathname

    // Get the userId from the request body
    const { userId }: UnlikePostRequestBody = await request.json();

    // Ensure that the userId is provided in the request
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in request body" },
        { status: 400 }
      );
    }

    // Find the post by its ID
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Call the method to remove the user's like from the post
    await post.unlikePost(userId);

    return NextResponse.json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error("Error unliking post:", error);
    return NextResponse.json(
      { error: "An error occurred while unliking the post" },
      { status: 500 }
    );
  }
}
