import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

/* ---------- Fonts ---------- */
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

/* ---------- Metadata ---------- */
export const metadata: Metadata = {
  metadataBase: new URL('https://ranius.app'), // ⚠️ apna real domain daal dena
  title: {
    default: 'Ranius — Share Your Moments, Share Your Thoughts',
    template: '%s | Ranius',
  },
  description:
    'Ranius is a modern social platform to share your moments, thoughts, and connect with people. Post updates, like, comment, and grow your network.',
  applicationName: 'Ranius',
  keywords: [
    'Ranius',
    'social network',
    'share moments',
    'share thoughts',
    'posts',
    'community',
    'microblogging',
  ],
  authors: [{ name: 'Ranius', url: 'https://ranius.app' }],
  creator: 'Ranius',
  publisher: 'Ranius',
  category: 'Social Network',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ranius.app',
    siteName: 'Ranius',
    title: 'Ranius — Share Your Moments, Share Your Thoughts',
    description:
      'Ranius is a modern social platform to share your moments, thoughts, and connect with people.',
    images: [
      {
        url: '/og-image.png', // public/og-image.png me 1200x630 image rakho
        width: 1200,
        height: 630,
        alt: 'Ranius',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ranius — Share Your Moments, Share Your Thoughts',
    description:
      'Ranius is a modern social platform to share your moments, thoughts, and connect with people.',
    images: ['/og-image.png'],
    creator: '@ranius',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ---------- Viewport (Next.js 14+ best practice) ---------- */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A66C2',
};

/* ---------- Layout ---------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-screen flex flex-col font-sans antialiased bg-white text-gray-900">
          {/* ---------- Loading screen ---------- */}
          <ClerkLoading>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
              <svg
                width="80"
                height="80"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse"
                role="img"
                aria-label="Ranius loading"
              >
                <rect width="120" height="120" rx="24" fill="#0A66C2" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="70"
                  fontWeight="bold"
                  fill="white"
                  fontFamily="Arial, sans-serif"
                >
                  R
                </text>
              </svg>
              <div className="mt-4 text-center">
                <h1 className="text-xl font-bold text-gray-800">Ranius</h1>
                <p className="text-xs text-gray-600 mt-1">
                  Share Your Moments, Share Your Thoughts
                </p>
              </div>
            </div>
          </ClerkLoading>

          {/* ---------- App ---------- */}
          <ClerkLoaded>
            {/* 🎯 Pro Toaster — Bottom Right, no close button */}
            <Toaster
              position="bottom-right"
              richColors
              expand={false}
              duration={3000}
              toastOptions={{
                classNames: {
                  toast:
                    'group !bg-white !border !border-gray-200 !shadow-lg !shadow-black/5 !rounded-xl !font-sans',
                  title: '!text-[13.5px] !font-semibold !text-gray-900',
                  description: '!text-[12.5px] !text-gray-600',
                  actionButton:
                    '!bg-[#0a66c2] !text-white !text-xs !font-medium !rounded-md',
                  cancelButton:
                    '!bg-gray-100 !text-gray-700 !text-xs !font-medium !rounded-md',
                  success: '!bg-white',
                  error: '!bg-white',
                  info: '!bg-white',
                  warning: '!bg-white',
                },
              }}
            />

            {/* Header component already renders <header> internally — no wrapper */}
            <Header />

            <div className="bg-[#f4f2ed] flex-1 w-full">
              <main className="max-w-6xl mx-auto px-0 sm:px-4">{children}</main>
            </div>
            <Footer />
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
