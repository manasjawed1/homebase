import type { Metadata } from "next";
import TopNav from "@/components/layout/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homebase — AI-Powered Property Management",
  description: "AI co-pilot for property management in Dubai/UAE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg">
        <TopNav />
        <main className="max-w-[1400px] mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
