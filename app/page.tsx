import Feed from '@/components/mian_Feed/feed';
import type { Metadata } from 'next';

// ✅ Updated Metadata for Ranius
export const metadata: Metadata = {
  title: 'Feed | Ranius',
  description:
    'Stay updated with the latest news, posts, and insights from your professional network on Ranius.',
  keywords: [
    'Ranius',
    'professional network',
    'feed',
    'updates',
    'posts',
    'jobs',
    'career',
    'networking',
  ],
  authors: [{ name: 'Ranius Team' }],
  applicationName: 'Ranius',
  openGraph: {
    title: 'Feed | Ranius',
    description:
      'Stay updated with the latest news, posts, and insights from your professional network on Ranius.',
    type: 'website',
    siteName: 'Ranius',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feed | Ranius',
    description:
      'Stay updated with the latest news, posts, and insights from your professional network on Ranius.',
  },
};

const Page = () => {
  return (
    <div>
      <Feed />
    </div>
  );
};

export default Page;
