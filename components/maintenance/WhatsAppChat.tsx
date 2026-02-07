"use client";

import { useState, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "tenant" | "ai";
  time: string;
  isArabic?: boolean;
}

const messages: Message[] = [
  { id: 1, text: "المكيف لا يعمل", sender: "tenant", time: "14:23", isArabic: true },
  { id: 2, text: "AC not working", sender: "tenant", time: "14:23" },
  { id: 3, text: "I've logged your request. Finding an HVAC specialist near Al Barsha...", sender: "ai", time: "14:23" },
];

export default function WhatsAppChat() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    // Show messages one by one with delays
    messages.forEach((msg, index) => {
      setTimeout(() => {
        if (index === messages.length - 1) {
          setShowTyping(true);
          setTimeout(() => {
            setShowTyping(false);
            setVisibleMessages((prev) => [...prev, msg]);
          }, 1500);
        } else {
          setVisibleMessages((prev) => [...prev, msg]);
        }
      }, index * 800);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="text-sm font-semibold text-text">Screen 1: Tenant Initiates Request (WhatsApp)</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="p-6 flex justify-center">
        <div className="w-[380px]">
          {/* Chat Header */}
          <div className="bg-primary rounded-t-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Homebase AI Agent</p>
              <p className="text-green-200 text-xs">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[280px] rounded-b-2xl">
            {visibleMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "tenant" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-3 py-2 ${
                    msg.sender === "tenant"
                      ? "bg-[#DCF8C6] text-right"
                      : "bg-white"
                  }`}
                >
                  {msg.sender === "ai" && (
                    <div className="flex items-center gap-1 mb-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                      <span className="text-xs font-medium text-purple-600">AI</span>
                    </div>
                  )}
                  <p className={`text-sm ${msg.isArabic ? "font-arabic" : ""}`} dir={msg.isArabic ? "rtl" : "ltr"}>
                    {msg.text}
                  </p>
                  <div className={`flex items-center gap-1 mt-1 ${msg.sender === "tenant" ? "justify-end" : ""}`}>
                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                    {msg.sender === "tenant" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#53BDEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L7 17l-5-5"/>
                        <path d="M22 6L11 17"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {showTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.1s]"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
