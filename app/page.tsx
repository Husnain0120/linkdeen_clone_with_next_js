import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import Widget from "@/components/widget";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post.models";
import { SignedIn } from "@clerk/nextjs";
import ReloadPostsButton from "@/components/ReloadPostsButton"; // Import the client component
import NetworkStatus from "@/components/NetworkStatus"; // Ensure NetworkStatus uses Sonner for notifications
import { toast } from "sonner"; // Import Sonner's toast for manual control if needed

export const revalidate = 0;

export default async function Home() {
  await connectDB();

  const posts = await Post.getAllPost();

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        {/* UserInformation */}
        <SignedIn>
          <UserInformation posts={posts} />
        </SignedIn>
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        {/* NetworkStatus: Sonner will handle notifications */}
        <NetworkStatus />

        {/* PostForm */}
        <div className="hidden md:block mb-10">
          <SignedIn>
            <PostForm />
          </SignedIn>
        </div>

        {/* Post Feed */}
        <PostFeed posts={posts} />

        {/* Reload Posts Button */}
        <ReloadPostsButton />
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        {/* widget*/}
        <Widget />
      </section>
    </div>
  );
}
