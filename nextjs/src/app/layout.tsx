import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import AuthProvider from "@/fwk/context/authProvider";
import AppBar from "@/components/appBar";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starter Kit",
  description: "Sample Next.js app with Tailwind CSS and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${font.className} text-gray-700 flex flex-col h-screen`}
      >
        <AuthProvider>
          <div className="sticky top-0 z-50 w-full border-b">
            <AppBar />
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
