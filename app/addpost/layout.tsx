import type { Metadata } from "next";

import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Create post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <ClerkLoading>
            <div className="flex items-center justify-center min-h-screen">
              <svg
                width="80"
                height="80"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse"
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
              <div className="pl-4">
                <h1 className="text-xl block md:hidden font-bold text-gray-800">
                  Ranius
                </h1>
                <p className="text-xs block md:hidden text-gray-600">
                  Share Your Moments, Share Your Thoughts
                </p>
              </div>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            {/* Toaster */}
            <Toaster position="bottom-left" />

            <div className="bg-[#f4f2ed] flex-1 w-full">
              <main className="max-w-6xl mx-auto">
                {/* Conditionally render components */}

                <>
                  {/* Optionally add other components for different routes */}
                  {/* Example: Add header here if you want */}
                  {/* <Header /> */}
                  {children}
                </>
              </main>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
