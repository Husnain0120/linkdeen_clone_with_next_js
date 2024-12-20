import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
              {" "}
              {/* LinkedIn Blue Background */}
              <svg
                width="80" // Adjust width and height for loading animation
                height="80"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse" // Add spin animation for loading effect
              >
                <rect width="120" height="120" rx="24" fill="#0A66C2" />{" "}
                {/* White background for the logo */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="70"
                  fontWeight="bold"
                  fill="white" // LinkedIn blue for the "R"
                  fontFamily="Arial, sans-serif"
                >
                  R
                </text>
              </svg>
              <div className=" pl-4">
                <h1 className="text-xl block md:hidden   font-bold text-gray-800">
                  Ranius
                </h1>
                <p className="text-xs block md:hidden text-gray-600">
                  Share Your Moments, Share Your Thoughts
                </p>
              </div>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            {/* Toster */}
            <Toaster position="bottom-left" />
            <header className="border-b sticky top-0 bg-white z-50">
              <Header />
            </header>

            <div className="bg-[#f4f2ed] flex-1 w-full">
              <main className="mx-w-6xl mx-auto">{children}</main>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
