"use client";
import { useState } from "react";
import { Send, Brain, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

export default function QuizPage() {
    type Quiz = {
        question: string;
        options: string[];
        answer: string;
    };

    type Message =
        | { role: "user"; content: string }
        | { role: "ai"; content: Quiz[] | string };

    const [messages, setMessages] = useState<Message[]>([]);
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);

    const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

    const handleSend = async () => {
        if (!topic.trim()) return;

        setMessages((prev) => [...prev, { role: "user", content: topic }]);
        setTopic("");
        setLoading(true);

        try {
            const res = await fetch(`${BACKEND_URL}/quiz/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            if (!res.ok) {
                let errText = `Backend error: ${res.status}`;
                try {
                    const errJson = await res.json();
                    if (errJson && errJson.detail) errText += ` - ${errJson.detail}`;
                } catch {
                }
                throw new Error(errText);
            }

            const data = await res.json();

            if (!data || !Array.isArray(data.quiz)) {
                throw new Error("Invalid response from server");
            }

            setMessages((prev) => [...prev, { role: "ai", content: data.quiz }]);

        } catch (error) {
            console.error("Quiz fetch error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: `Error: ${String(error)}` },
            ]);

        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="bg-[#E2E2E0] min-h-screen selection:bg-[#861211]/20 font-sans">
            <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">

                {/* --- CONTAINER HEIGHT UPDATED TO 85vh --- */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/5 overflow-hidden border border-[#0E2931]/5 flex flex-col h-[85vh]">

                    {/* Toolbar */}
                    <div className="border-b border-[#0E2931]/10 px-8 py-5 flex justify-between items-center bg-white">
                        <h2 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter flex items-center gap-3">
                            <div className="p-2 bg-[#0E2931] rounded-xl text-white shadow-lg">
                                <Brain className="w-5 h-5" />
                            </div>
                            Neural Assessment
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2B7574] animate-pulse">
                                System Active
                            </span>
                        </div>
                    </div>

                    {/* Chat/Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-[#E2E2E0]/10">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#0E2931]/10 border border-[#0E2931]/5">
                                    <Sparkles size={40} />
                                </div>
                                <p className="text-[#0E2931]/30 font-black uppercase tracking-[0.3em] text-xs">
                                    Initialize topic for evaluation
                                </p>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[90%] rounded-[1.5rem] leading-relaxed shadow-sm transition-all duration-300 ${
                                        msg.role === "user"
                                            ? "bg-[#861211] text-white rounded-tr-sm px-6 py-4 shadow-lg shadow-[#861211]/20"
                                            : "bg-white border border-[#0E2931]/5 text-[#0E2931] rounded-tl-sm p-6 md:p-8"
                                    }`}
                                >
                                    {msg.role === "user" ? (
                                        <span className="font-bold uppercase tracking-widest text-xs">{msg.content}</span>
                                    ) : Array.isArray(msg.content) ? (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-4 border-b border-[#0E2931]/5">
                                                <div className="w-2 h-2 rounded-full bg-[#2B7574]" />
                                                <p className="text-[11px] font-black uppercase tracking-widest text-[#0E2931]/40">
                                                    Results for tactical topic: <span className="text-[#0E2931]">
                                                        {messages[i - 1]?.role === "user" ? String(messages[i - 1].content) : "Node Input"}
                                                    </span>
                                                </p>
                                            </div>

                                            {msg.content.map((q, idx) => (
                                                <div key={idx} className="relative group">
                                                    <h3 className="font-black text-lg text-[#0E2931] uppercase tracking-tighter mb-5 flex gap-3">
                                                        <span className="text-[#861211]">{idx + 1}.</span>
                                                        {q.question}
                                                    </h3>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {q.options.map((opt, i2) => (
                                                            <li
                                                                key={i2}
                                                                className="px-5 py-4 border-2 border-[#E2E2E0] rounded-2xl hover:border-[#2B7574] hover:bg-[#E2E2E0]/20 cursor-pointer text-[#0E2931] text-sm font-medium transition-all"
                                                            >
                                                                {opt}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="mt-5 pt-4 border-t border-dashed border-[#0E2931]/10 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4 text-[#2B7574]" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#0E2931]/30">Key Phrase Verify:</span>
                                                            <b className="text-sm font-black text-[#0E2931] uppercase tracking-tighter">{q.answer}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 text-[#861211] font-black uppercase text-[10px] tracking-widest bg-red-50 p-4 rounded-xl border border-red-100">
                                            <AlertCircle className="w-5 h-5" />
                                            <span>{msg.content}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-[#0E2931]/5 text-[#0E2931]/40 px-8 py-5 rounded-[1.5rem] rounded-tl-sm text-[10px] font-black uppercase tracking-[0.3em] animate-pulse shadow-sm flex items-center gap-3">
                                    <Sparkles size={14} className="text-[#861211]" />
                                    Synthesizing Quiz Data...
                                </div>
                            </div>
                        )}
                        <div className="pt-2" />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-[#0E2931]/5 p-6 bg-white">
                        <div className="flex items-center gap-4 max-w-4xl mx-auto">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="ENTER TOPIC FOR NEURAL ASSESSMENT..."
                                    className="w-full px-8 py-5 bg-[#E2E2E0]/30 border border-[#0E2931]/5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#861211]/20 focus:bg-white text-[#0E2931] text-[11px] font-black tracking-widest placeholder-[#0E2931]/30 transition-all"
                                    disabled={loading}
                                />
                                <Brain className="absolute right-6 top-1/2 -translate-y-1/2 text-[#0E2931]/10 w-5 h-5" />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={loading || !topic.trim()}
                                className="p-5 bg-[#861211] hover:bg-[#6a0e0d] text-white rounded-full transition-all disabled:opacity-30 shadow-xl shadow-[#861211]/20 active:scale-95"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-center mt-4 text-[9px] font-black uppercase tracking-[0.4em] text-[#0E2931]/20">
                            UAARN Labs • Secure Evaluation Protocol Operational
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}