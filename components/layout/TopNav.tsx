"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Renewals", href: "/renewals" },
  { label: "Properties", href: "/properties" },
  { label: "Vendors", href: "/vendors" },
  { label: "Mobile", href: "/mobile" },
  { label: "System", href: "/system" },
  { label: "Style Guide", href: "/style-guide" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Logo Row */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-text leading-tight">Homebase</h1>
              <p className="text-xs text-text-muted leading-tight">AI-Powered Property Management</p>
            </div>
          </Link>

          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-gray-50 text-sm text-text-secondary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            العربية
          </button>
        </div>

        {/* Nav Tabs */}
        <nav className="flex gap-1 -mb-px">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2",
                  isActive
                    ? "text-primary border-primary bg-primary/5"
                    : "text-text-secondary border-transparent hover:text-text hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
