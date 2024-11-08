import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post.models";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET Method to fetch likes for a post
export async function GET(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  try {
    // Await params to ensure proper access
    const { post_id } = params; // Destructure post_id from params

    // Find the post by its ID
    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const likes = post.likes;
    return NextResponse.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching likes" },
      { status: 500 }
    );
  }
}

// Interface for request body validation
export interface LikePostRequestBody {
  userId: string;
}

// POST Method to like a post
export async function POST(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  await connectDB();

  // Await the authentication result and get the userId
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }

  // Parse the request body and check for required fields
  const body: LikePostRequestBody = await request.json();

  if (!body.userId) {
    return NextResponse.json(
      { error: "Missing userId in request body" },
      { status: 400 }
    );
  }

  try {
    // Await params to ensure proper access
    const { post_id } = params; // Destructure post_id from params

    // Find the post by its ID
    const post = await Post.findById(post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Toggle the like for the post
    await post.likePost(body.userId);
    return NextResponse.json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json(
      { error: "An error occurred while liking the post" },
      { status: 500 }
    );
  }
}
