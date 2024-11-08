import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post.models";
import { NextResponse } from "next/server";

// Interface for the request body
export interface UnlikePostRequestBody {
  userId: string;
}

// POST method to unlike a post
export async function POST(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  // Ensure that params are awaited
  const { post_id } = params; // Await params to access post_id

  // Get the userId from the request body
  const { userId }: UnlikePostRequestBody = await request.json();

  try {
    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Call the method to remove the user's like from the post
    await post.unlikePost(userId);
    return NextResponse.json({ message: "Post unliked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while unliking the post" },
      { status: 500 }
    );
  }
}
