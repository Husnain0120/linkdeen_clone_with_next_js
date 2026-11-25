import NetworkStatus from '@/components/NetworkStatus';
import PostFeed from '@/components/PostFeed';
import PostForm from '@/components/PostForm';
import ReloadPostsButton from '@/components/ReloadPostsButton';
import UserInformation from '@/components/UserInformation';
import Widget from '@/components/widget';
import connectDB from '@/mongodb/db';
import { Post } from '@/mongodb/models/post.models';
import { SignedIn } from '@clerk/nextjs';

export const revalidate = 0;

export default async function Home() {
  await connectDB();
  const posts = await Post.getAllPost();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-6 pt-4 pb-12">
      {/* ============ LEFT SIDEBAR — User Info ============ */}
      <aside className="hidden md:block md:col-span-3">
        <div className="sticky top-20 space-y-3">
          <SignedIn>
            <UserInformation posts={posts} />
          </SignedIn>
        </div>
      </aside>

      {/* ============ CENTER — Feed ============ */}
      <div className="col-span-1 md:col-span-9 lg:col-span-6 flex flex-col gap-3 min-w-0">
        <NetworkStatus />

        <SignedIn>
          <div className="hidden md:block">
            <PostForm />
          </div>
        </SignedIn>

        {/* PostFeed ko internally bhi space chahiye — neeche note dekho */}
        <PostFeed posts={posts} />

        <ReloadPostsButton />
      </div>

      {/* ============ RIGHT SIDEBAR — Widget ============ */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-20 space-y-3">
          <Widget />
        </div>
      </aside>
    </div>
  );
}
