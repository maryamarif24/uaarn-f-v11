"use client";

import { useState } from "react";
import { AlertCircle, Bot, Sparkles } from "lucide-react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

type Message = {
    role: "user" | "ai";
    content: string;
};

export default function AskPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
    const USER_ID = "demo-user";
    const USER_NAME = "";

    const formatResponse = (text: string) => {
        return text
            .replace(/\n/g, "<br>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    };

    const handleSend = async (text: string) => {
        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/ask/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": USER_ID,
                    "x-user-name": USER_NAME,
                },
                body: JSON.stringify({ message: text }),
            });

            if (!res.ok) {
                const err = await res.json();
                setMessages((prev) => [
                    ...prev,
                    { role: "ai", content: `Error: ${err.detail}` },
                ]);
            } else {
                const data = await res.json();
                const reply = formatResponse(data.reply);
                setMessages((prev) => [
                    ...prev,
                    { role: "ai", content: reply },
                ]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    content: "Network error. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#E2E2E0] min-h-screen selection:bg-[#861211]/20">
            <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#0E2931]/5 flex flex-col h-[85vh]">
                    
                    {/* Header */}
                    <div className="border-b border-[#0E2931]/10 px-8 py-5 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#0E2931] rounded-xl text-white shadow-lg">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter">
                                    Ask UAARN
                                </h2>
                                <p className="text-[10px] font-bold text-[#2B7574] uppercase tracking-widest">
                                    Neural Intelligence Path
                                </p>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0E2931]/10 text-[#0E2931]/40 text-[10px] font-black uppercase tracking-widest">
                            <Sparkles size={12} className="text-[#861211]" />
                            Operational
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-2 bg-[#E2E2E0]/10">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 bg-[#0E2931]/5 rounded-full flex items-center justify-center text-[#0E2931]/20">
                                    <Sparkles size={32} />
                                </div>
                                <p className="text-[#0E2931]/30 font-bold uppercase tracking-[0.2em] text-xs">
                                    Initialize your learning journey
                                </p>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <ChatBubble
                                key={i}
                                isUser={msg.role === "user"}
                                dangerouslySetInnerHTML={
                                    !msg.content.includes("Error:")
                                        ? { __html: msg.content }
                                        : undefined
                                }
                            >
                                {msg.content.includes("Error:") && (
                                    <div className="flex items-center gap-2 text-[#861211] font-bold uppercase text-[10px] tracking-widest">
                                        <AlertCircle className="w-4 h-4" />
                                        {msg.content}
                                    </div>
                                )}
                            </ChatBubble>
                        ))}

                        {loading && (
                            <div className="flex justify-start mt-4">
                                <div className="bg-white border border-[#0E2931]/5 text-[#0E2931]/40 px-6 py-4 rounded-2xl rounded-tl-sm text-xs font-black uppercase tracking-widest animate-pulse shadow-sm">
                                    Synthesizing Insight...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t border-[#0E2931]/5 bg-white p-6">
                        <ChatInput
                            onSend={handleSend}
                            onFileUpload={async () => {}}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
