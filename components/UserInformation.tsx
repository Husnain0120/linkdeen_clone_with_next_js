// components/UserInformation.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IPostDocument } from '@/mongodb/models/post.models';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import {
  BarChart3,
  Eye,
  Flame,
  Heart,
  MessageSquare,
  Search,
  Users,
} from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

/* ---------- Helpers ---------- */
function daysBetween(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

/* ---------- Component ---------- */
const UserInformation = async ({ posts }: { posts: IPostDocument[] }) => {
  const user = await currentUser();

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const imageUrl = user?.imageUrl;
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  /* ----- Derived data ----- */
  const userPosts = (posts ?? []).filter(p => p.user.userId === user?.id);
  const userComments = (posts ?? []).flatMap(
    p => p?.comments?.filter(c => c.user.userId === user?.id) ?? []
  );

  const postsCount = userPosts.length;
  const commentsCount = userComments.length;

  const totalLikesReceived = userPosts.reduce((sum, p) => {
    const likes = Array.isArray(p.likes) ? p.likes.length : p.likes ? 1 : 0;
    return sum + likes;
  }, 0);

  const totalCommentsReceived = userPosts.reduce(
    (sum, p) => sum + (p.comments?.length ?? 0),
    0
  );

  const engagementRate =
    postsCount > 0
      ? Math.round(
          ((totalLikesReceived + totalCommentsReceived) / postsCount) * 10
        )
      : 0;

  // Post impressions ≈ total likes + comments on user's posts (LinkedIn formula approximation)
  const postImpressions = totalLikesReceived + totalCommentsReceived;

  // Fake "search appearances" derived from activity (LinkedIn shows real data)
  const searchAppearances = postsCount * 12 + commentsCount * 4;

  // Activity streak
  let streak = 0;
  if (userPosts.length > 0) {
    const sorted = [...userPosts]
      .map(p => new Date(p.createdAt))
      .sort((a, b) => b.getTime() - a.getTime());
    const today = new Date();
    let ref = today;
    for (const d of sorted) {
      if (daysBetween(d, ref) <= 1) {
        streak += 1;
        ref = d;
      } else break;
    }
  }

  /* ----- Render ----- */
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* ---- Cover (LinkedIn blue) ---- */}
      <div className="h-14 bg-gradient-to-r from-blue-700 to-blue-600" />

      {/* ---- Profile ---- */}
      <div className="px-4 pb-4">
        <div className="-mt-8 mb-2">
          <Avatar className="h-16 w-16 ring-2 ring-white">
            {user?.id ? (
              <AvatarImage src={imageUrl} alt={fullName || 'User'} />
            ) : (
              <AvatarImage src="https://github.com/shadcn.png" />
            )}
            <AvatarFallback className="bg-blue-700 text-white text-lg font-semibold">
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <SignedIn>
          <div>
            <h3 className="text-base font-semibold text-gray-900 leading-tight hover:underline cursor-pointer">
              {fullName}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5 leading-snug">
              Content creator · Building in public
            </p>
            <p className="text-xs text-gray-500 mt-1">
              @{firstName.toLowerCase()}
              {lastName.toLowerCase()}-{user?.id?.slice(-4)}
            </p>
          </div>
        </SignedIn>

        <SignedOut>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              You are not signed in
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Sign in to see your analytics
            </p>
          </div>
        </SignedOut>
      </div>

      {/* ---- Signed-out CTAs ---- */}
      <SignedOut>
        <div className="px-4 pb-4 space-y-2">
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="w-full rounded-full font-semibold border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white">
              Join now
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>

      {/* ---- Signed-in analytics ---- */}
      <SignedIn>
        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* ─── ANALYTICS (LinkedIn style) ─── */}
        <div className="px-4 py-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Analytics
          </h4>

          <div className="space-y-0.5">
            <AnalyticsRow
              icon={<Eye className="h-4 w-4 text-gray-500" />}
              label="Post impressions"
              value={formatNumber(postImpressions)}
            />
            <AnalyticsRow
              icon={<BarChart3 className="h-4 w-4 text-gray-500" />}
              label="Engagement rate"
              value={`${engagementRate}%`}
            />
            <AnalyticsRow
              icon={<Users className="h-4 w-4 text-gray-500" />}
              label="Search appearances"
              value={formatNumber(searchAppearances)}
            />
            <AnalyticsRow
              icon={<Flame className="h-4 w-4 text-gray-500" />}
              label="Activity streak"
              value={`${streak} ${streak === 1 ? 'day' : 'days'}`}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* ─── CONTENT STATS ─── */}
        <div className="px-4 py-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Content
          </h4>

          <div className="space-y-0.5">
            <AnalyticsRow
              icon={<MessageSquare className="h-4 w-4 text-gray-500" />}
              label="Posts"
              value={formatNumber(postsCount)}
            />
            <AnalyticsRow
              icon={<MessageSquare className="h-4 w-4 text-gray-500" />}
              label="Comments"
              value={formatNumber(commentsCount)}
            />
            <AnalyticsRow
              icon={<Heart className="h-4 w-4 text-gray-500" />}
              label="Likes received"
              value={formatNumber(totalLikesReceived)}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* ─── FOOTER LINK (LinkedIn pattern) ─── */}
        <button className="w-full flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
          <Search className="h-3.5 w-3.5" />
          Show all analytics
        </button>
      </SignedIn>
    </div>
  );
};

/* ---------- Sub-components ---------- */

function AnalyticsRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 hover:bg-gray-50 rounded px-1 -mx-1 cursor-pointer transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <span className="shrink-0">{icon}</span>
        <span className="text-xs text-gray-700 truncate">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900 ml-2 shrink-0">
        {value}
      </span>
    </div>
  );
}

export default UserInformation;
