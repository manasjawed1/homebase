"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: "grid" },
  { label: "Maintenance", href: "/maintenance", icon: "wrench" },
  { label: "Renewals", href: "/renewals", icon: "file" },
  { label: "Properties", href: "/properties", icon: "building" },
  { label: "Vendors", href: "/vendors", icon: "users" },
  { label: "Mobile", href: "/mobile", icon: "phone" },
  { label: "System", href: "/system", icon: "settings" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <header className="sticky top-0 z-50">
      <div className="navy-gradient text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border-2 border-gold/60 bg-gold/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5963A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold tracking-wide text-white leading-tight">HOMEBASE</h1>
                <p className="text-[10px] text-gold-light tracking-widest uppercase leading-tight">Property Management Authority</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs text-navy-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                System Online
              </div>
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-navy-200 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                {lang === "en" ? "العربية" : "English"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex gap-0 -mb-px">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-5 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2",
                    isActive
                      ? "text-primary border-gold bg-navy-50/50 font-semibold"
                      : "text-text-secondary border-transparent hover:text-primary hover:bg-navy-50/30"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
