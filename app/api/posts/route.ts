import connectDB from '@/mongodb/db'; // Import MongoDB connection
import { IpostBase, Post } from '@/mongodb/models/post.models'; // Import Post model
import { IUser } from '@/types/user.type'; // Import user type
import { getAuth } from '@clerk/nextjs/server'; // Import Clerk's getAuth for authentication
import { NextRequest, NextResponse } from 'next/server'; // Import Next.js response and NextRequest types

// Interface for request body structure when adding a post
export interface AddPostRequestBody {
  user: IUser; // User data
  text: string; // Text content of the post
  imageUrl?: string | null; // Optional image URL for the post
}

/**
 * POST method to create a new post.
 *
 * This method:
 * - Authenticates the user using Clerk's `getAuth()`.
 * - Parses the request body for post data.
 * - Connects to MongoDB and creates a new post.
 * - Returns the created post in the response.
 */
export async function POST(request: NextRequest) {
  // Use Clerk's getAuth to check if the user is authenticated
  const { userId } = getAuth(request);

  // If user is not authenticated, return a 401 Unauthorized response
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Connect to the database
    await connectDB();

    // Parse the request body for user, text, and imageUrl (if provided)
    const { user, text, imageUrl }: AddPostRequestBody = await request.json();

    // Prepare post data to be saved
    const postData: IpostBase = {
      user,
      text,
      ...(imageUrl && { imageUrl }), // Add imageUrl only if provided
    };

    // Create a new post in the database
    const post = await Post.create(postData);

    // Return the created post as a response
    return NextResponse.json({ message: 'Post created successfully', post });
  } catch (error) {
    // Handle any errors and return a 500 Internal Server Error response
    return NextResponse.json(
      { error: 'An error occurred while creating the post' },
      { status: 500 }
    );
  }
}

/**
 * GET method to fetch all posts.
 *
 * This method:
 * - Connects to MongoDB and fetches all posts.
 * - Returns the posts in the response.
 */
export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all posts from the database using the Post model
    const posts = await Post.getAllPost();

    // Return the fetched posts in the response
    return NextResponse.json({ posts });
  } catch (error) {
    // Handle any errors and return a 500 Internal Server Error response
    return NextResponse.json(
      { error: 'An error occurred while fetching posts' },
      { status: 500 }
    );
  }
}
