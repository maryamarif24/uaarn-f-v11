import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import Footer from "./components/Footer";
import ClientWrapper from "./components/ClientWrapper"; // Import the wrapper

export const metadata: Metadata = {
  title: "UAARN - AI-Powered Education",
  description: "Your intelligent study companion",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-[#E2E2E0] text-[#0E2931] flex flex-col relative">
          {/* Use the Wrapper to handle Navbar and Modal state */}
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}