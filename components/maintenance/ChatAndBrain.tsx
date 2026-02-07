"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "tenant" | "ai" | "system";
  time: string;
  isArabic?: boolean;
  image?: boolean;
  triggersStep?: number;
}

interface VendorResult {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  jobs: number;
  responseTime: string;
  location: string;
  available: boolean;
  distance: string;
}

interface ReasoningStep {
  number: number;
  title: string;
  detail: string;
  time: string;
  triggeredBy?: number;
  type?: "api" | "process" | "result";
  apiData?: {
    endpoint: string;
    method: string;
    params?: Record<string, string>;
    response?: VendorResult[];
  };
}

const messages: Message[] = [
  { id: 0, text: "Today", sender: "system", time: "" },
  { id: 1, text: "Hi, my AC is not working", sender: "tenant", time: "14:20", triggersStep: 1 },
  { id: 2, text: "Hello! I'm here to help with your AC issue. 😊\n\nBefore I find you a technician, could you please tell me:\n• Your name\n• Your unit number\n• Which building/area?", sender: "ai", time: "14:20" },
  { id: 3, text: "Sure! I'm Sara, Unit 402 in Al Barsha South", sender: "tenant", time: "14:21", triggersStep: 2 },
  { id: 4, text: "Perfect, thank you Sara! 🙏\n\nCan you describe what's wrong with the AC? Is it making noise, not cooling, or something else?", sender: "ai", time: "14:21" },
  { id: 5, text: "المكيف لا يعمل في الشقة", sender: "tenant", time: "14:22", isArabic: true },
  { id: 6, text: "The AC in my apartment is not working. It makes a loud noise and doesn't cool. There's also water leaking and stains on the wall.", sender: "tenant", time: "14:22", triggersStep: 3 },
  { id: 7, text: "📸 Photo attached", sender: "tenant", time: "14:22", image: true },
  { id: 8, text: "Oh no, I can see the water damage in the photo! 😟 That's definitely an urgent issue. Let me find you a qualified HVAC technician right away.", sender: "ai", time: "14:23", triggersStep: 4 },
  { id: 9, text: "Great news! I found Ahmad HVAC Services - they're highly rated (4.8 stars) and available now.\n\nThey'll be at your unit in about 45 minutes. The technician's number is +971-50-XXX-XXXX if you need to contact them directly.\n\nI'll keep you updated every step of the way! 👍", sender: "ai", time: "14:23", triggersStep: 7 },
  { id: 10, text: "شكراً جزيلاً! سريع جداً 👍", sender: "tenant", time: "14:24", isArabic: true },
  { id: 11, text: "Thank you so much! That was really fast!", sender: "tenant", time: "14:24" },
  { id: 12, text: "You're very welcome, Sara! 😊\n\nI'll send you a message as soon as the technician is on their way. If you need anything else, just let me know!", sender: "ai", time: "14:24" },
];

const vendorResults: VendorResult[] = [
  { id: "v001", name: "Ahmad HVAC", specialty: "HVAC", rating: 4.8, jobs: 234, responseTime: "45 min", location: "Al Barsha", available: true, distance: "2.1 km" },
  { id: "v002", name: "Dubai Cool Air", specialty: "HVAC", rating: 4.6, jobs: 189, responseTime: "1.5 hrs", location: "JBR", available: true, distance: "8.3 km" },
  { id: "v003", name: "FastFix HVAC", specialty: "HVAC", rating: 4.4, jobs: 156, responseTime: "2 hrs", location: "Downtown", available: false, distance: "12.5 km" },
  { id: "v004", name: "CoolPro Services", specialty: "HVAC", rating: 4.7, jobs: 298, responseTime: "1 hr", location: "Dubai Marina", available: true, distance: "9.8 km" },
  { id: "v005", name: "AC Masters UAE", specialty: "HVAC", rating: 4.5, jobs: 201, responseTime: "1.2 hrs", location: "Al Barsha", available: true, distance: "3.2 km" },
];

const reasoningSteps: ReasoningStep[] = [
  { 
    number: 1, 
    title: "Analyzed message", 
    detail: "Detected: Maintenance (HVAC)", 
    time: "0.5s", 
    triggeredBy: 1,
    type: "process"
  },
  { 
    number: 2, 
    title: "Checked tenant history", 
    detail: "Sara - Unit 402, Al Barsha South. No previous AC issues.", 
    time: "1.2s", 
    triggeredBy: 3,
    type: "process"
  },
  { 
    number: 3, 
    title: "Processed complaint details", 
    detail: "HVAC issue: Noise + no cooling + water leak. Urgent priority.", 
    time: "1.8s", 
    triggeredBy: 6,
    type: "process"
  },
  { 
    number: 4, 
    title: "Querying Crustdata API", 
    detail: "Searching vendor database for HVAC specialists", 
    time: "2.1s", 
    triggeredBy: 8,
    type: "api",
    apiData: {
      endpoint: "https://api.crustdata.com/screener/company/search",
      method: "POST",
      params: {
        "filter_type": "REGION → United Arab Emirates",
        "industry": "Facilities Services",
        "specialties": "HVAC",
        "location": "Al Barsha South"
      }
    }
  },
  { 
    number: 5, 
    title: "Received vendor results", 
    detail: "Found 5 vendors matching criteria", 
    time: "2.3s", 
    triggeredBy: 8,
    type: "result",
    apiData: {
      endpoint: "https://api.crustdata.com/screener/company?company_domain=ahmad-hvac.ae",
      method: "GET",
      response: vendorResults
    }
  },
  { 
    number: 6, 
    title: "Filtered & ranked vendors", 
    detail: "Applied filters: Available now, <3km distance, >4.5 rating", 
    time: "2.6s", 
    triggeredBy: 8,
    type: "process"
  },
  { 
    number: 7, 
    title: "Selected optimal vendor", 
    detail: "Ahmad HVAC (4.8★, 2.1km, available now). Notified tenant + vendor.", 
    time: "3.2s", 
    triggeredBy: 9,
    type: "result"
  },
];

export default function ChatAndBrain() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<ReasoningStep[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVendorResults, setShowVendorResults] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= messages.length) return;

    const msg = messages[currentIndex];
    const delay = msg.sender === "system" ? 200 : msg.sender === "ai" ? 2000 : 1200;

    const timer = setTimeout(() => {
      if (msg.sender === "ai" && currentIndex > 0) {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setVisibleMessages((prev) => [...prev, msg]);
          if (msg.triggersStep) {
            const steps = reasoningSteps.filter(s => s.triggeredBy === msg.id);
            steps.forEach((step, idx) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, step]);
                if (step.type === "result" && step.apiData?.response) {
                  setTimeout(() => setShowVendorResults(true), 400);
                }
              }, idx * 300);
            });
          }
          setCurrentIndex((prev) => prev + 1);
        }, 1500);
      } else {
        setVisibleMessages((prev) => [...prev, msg]);
        if (msg.triggersStep) {
          const steps = reasoningSteps.filter(s => s.triggeredBy === msg.id);
          steps.forEach((step, idx) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, step]);
              if (step.type === "result" && step.apiData?.response) {
                setTimeout(() => setShowVendorResults(true), 400);
              }
            }, idx * 300 + 500);
          });
        }
        setCurrentIndex((prev) => prev + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleMessages, showTyping]);

  useEffect(() => {
    if (brainRef.current) {
      brainRef.current.scrollTop = brainRef.current.scrollHeight;
    }
  }, [visibleSteps, showVendorResults]);

  const step4 = visibleSteps.find(s => s.number === 4);
  const step5 = visibleSteps.find(s => s.number === 5);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-success rounded-full"></div>
            <span className="text-xs font-semibold text-text uppercase tracking-wider">WhatsApp Chat</span>
            <span className="text-xs text-text-muted">Tenant Conversation</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Live demo
          </div>
        </div>

        <div className="p-4 flex justify-center bg-navy-50/30">
          <div className="w-full max-w-[380px] shadow-xl rounded-2xl overflow-hidden border border-navy-200/50">
            <div className="bg-[#075E54] px-4 pt-2 pb-0">
              <div className="flex items-center justify-center mb-2">
                <div className="w-20 h-1 bg-white/20 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center ring-2 ring-white/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5963A" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">Homebase AI</p>
                    <p className="text-emerald-300 text-[10px]">online</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </div>
              </div>
            </div>

            <div
              ref={chatRef}
              className="bg-[#E5DDD5] p-3 space-y-1.5 h-[500px] overflow-y-auto scroll-smooth"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8bfb0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
            >
              {visibleMessages.map((msg) => {
                if (msg.sender === "system") {
                  return (
                    <div key={msg.id} className="flex justify-center py-2">
                      <span className="bg-white/80 text-[10px] text-gray-600 font-medium px-3 py-1 rounded-md shadow-sm">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={cn("flex", msg.sender === "tenant" ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 shadow-sm relative",
                      msg.sender === "tenant"
                        ? "bg-[#DCF8C6] rounded-tr-none"
                        : "bg-white rounded-tl-none"
                    )}>
                      {msg.sender === "ai" && (
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-[10px] font-bold text-[#075E54]">Homebase AI</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
                        </div>
                      )}
                      {msg.image ? (
                        <div className="mb-1">
                          <img 
                            src="/image.png" 
                            alt="AC unit with water damage" 
                            className="rounded-md max-w-[200px] h-auto object-cover"
                          />
                        </div>
                      ) : (
                        <p className={cn("text-[13px] leading-relaxed whitespace-pre-line", msg.isArabic && "text-right")} dir={msg.isArabic ? "rtl" : "ltr"}>
                          {msg.text}
                        </p>
                      )}
                      <div className={cn("flex items-center gap-1 mt-0.5", msg.sender === "tenant" ? "justify-end" : "")}>
                        <span className="text-[10px] text-gray-500">{msg.time}</span>
                        {msg.sender === "tenant" && (
                          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                            <path d="M11.071.929l-5.657 5.657-2.121-2.122L2.222 5.536l3.192 3.192L12.142 2l-1.07-1.071z" fill="#53BDEB"/>
                            <path d="M7.071.929L1.414 6.586l1.071 1.071 5.657-5.657L7.07.929z" fill="#53BDEB"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {showTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg rounded-tl-none px-4 py-2.5 shadow-sm">
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.15s]"></span>
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.3s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
              <div className="flex items-center gap-2 px-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
              </div>
              <div className="flex-1 bg-white rounded-full px-4 py-2 text-[13px] text-gray-400">
                Type a message
              </div>
              <div className="flex items-center gap-1 px-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                <div className="w-9 h-9 bg-[#00A884] rounded-full flex items-center justify-center ml-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-gold rounded-full"></div>
            <span className="text-xs font-semibold text-text uppercase tracking-wider">AI Brain</span>
            <span className="text-xs text-text-muted">Real-time Reasoning</span>
          </div>
          <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-success/10 text-success border border-success/20 uppercase tracking-wider">
            {visibleSteps.length > 0 ? `Step ${visibleSteps.length}/7` : "Waiting..."}
          </span>
        </div>

        <div ref={brainRef} className="p-5 h-[500px] overflow-y-auto scroll-smooth bg-navy-50/20">
          {visibleSteps.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0C2340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <p className="text-sm text-text-secondary font-medium">AI is analyzing...</p>
                <p className="text-xs text-text-muted mt-1">Reasoning steps will appear here as messages are processed</p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {visibleSteps.map((step, index) => (
                <div key={step.number} className="flex items-start gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-8 h-8 rounded flex items-center justify-center text-xs font-bold shrink-0",
                      step.type === "api" ? "bg-info text-white" : step.type === "result" ? "bg-success text-white" : "bg-primary text-white"
                    )}>
                      {step.type === "api" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/></svg>
                      ) : step.type === "result" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    {index < visibleSteps.length - 1 && <div className="w-px h-8 bg-border" />}
                  </div>

                  <div className={cn("flex-1 pb-3", index < visibleSteps.length - 1 ? "border-b border-border" : "")}>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-text">{step.title}</p>
                          {step.type !== "api" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary">{step.detail}</p>
                      </div>
                      <span className="text-[10px] text-text-muted font-mono">{step.time}</span>
                    </div>

                    {step.type === "api" && step.apiData && (
                      <div className="mt-3 bg-navy-900 rounded-lg p-3 border border-navy-700">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                          <span className="text-[10px] text-emerald-300 font-mono font-semibold">CRUSTDATA API</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-navy-300 font-mono">{step.apiData.method}</span>
                            <span className="text-[9px] text-navy-200 font-mono">{step.apiData.endpoint}</span>
                          </div>
                          {step.apiData.params && (
                            <div className="mt-2 pt-2 border-t border-navy-700">
                              <p className="text-[9px] text-navy-400 mb-1">Query Params:</p>
                              {Object.entries(step.apiData.params).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2 text-[9px] text-navy-300 font-mono">
                                  <span className="text-navy-400">{key}:</span>
                                  <span className="text-emerald-300">"{value}"</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-2 pt-2 border-t border-navy-700 flex items-center gap-2">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            <span className="text-[9px] text-emerald-300">200 OK - Response received</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.type === "result" && step.apiData?.response && showVendorResults && (
                      <div className="mt-3 bg-white rounded-lg border border-border p-3">
                        <p className="text-[10px] text-text-muted mb-2 font-semibold">Vendor Results from Crustdata:</p>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {step.apiData.response.map((vendor, idx) => (
                            <div
                              key={vendor.id}
                              className={cn(
                                "p-2 rounded border text-[10px] animate-in fade-in slide-in-from-left-2",
                                vendor.id === "v001" ? "border-gold bg-gold/5" : "border-border",
                                `duration-${300 + idx * 100}`
                              )}
                              style={{ animationDelay: `${idx * 100}ms` }}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-text">{vendor.name}</span>
                                {vendor.id === "v001" && (
                                  <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-gold text-white">SELECTED</span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-[9px] text-text-secondary">
                                <span>⭐ {vendor.rating}</span>
                                <span>📍 {vendor.distance}</span>
                                <span>⏱ {vendor.responseTime}</span>
                                <span className={vendor.available ? "text-emerald-600" : "text-gray-400"}>
                                  {vendor.available ? "✓ Available" : "✗ Busy"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {visibleSteps.length < 7 && (
                <div className="flex items-start gap-4 mt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded bg-navy-100 border-2 border-dashed border-navy-300 flex items-center justify-center text-xs font-bold shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#829AB1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 pb-3 pt-2">
                    <p className="text-xs text-text-muted italic">Processing next step...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
