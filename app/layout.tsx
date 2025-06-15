import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brainr",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkPublishableKey || clerkPublishableKey === 'your_clerk_publishable_key') {
    return (
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Required</h1>
              <p className="text-gray-700 mb-4">
                Please configure your environment variables in the <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file.
              </p>
              <div className="text-left text-sm text-gray-600">
                <p className="mb-2">Required variables:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>NEXT_PUBLIC_SUPABASE_URL</li>
                  <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                  <li>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</li>
                  <li>CLERK_SECRET_KEY</li>
                </ul>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider 
          publishableKey={clerkPublishableKey}
          appearance={{ variables: { colorPrimary: '#fe5933' } }}
        >
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}