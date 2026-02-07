import type { Metadata } from "next";
import TopNav from "@/components/layout/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homebase — Property Management Authority",
  description: "AI-powered property management system for Dubai/UAE",
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
        <main className="max-w-[1400px] mx-auto px-6 py-6">
          {children}
        </main>
        <footer className="border-t border-border bg-white mt-12">
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
            <p className="text-xs text-text-muted">Homebase Property Management Authority &mdash; Dubai, United Arab Emirates</p>
            <p className="text-xs text-text-muted">v2.1.0 &middot; All systems operational</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
