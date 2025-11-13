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
        
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 pt-10 pb-20">
                
                
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
                    
                    
                    <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center bg-white">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Brain className="w-6 h-6 text-blue-600" />
                            AI Quiz Generator
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500 hidden sm:inline">
                                Instant Learning Check
                            </span>
                        </div>
                    </div>

                    
                    <div className="h-[75vh] max-h-[800px] overflow-y-auto p-6 md:p-8 space-y-6">
                        {messages.length === 0 && (
                            <p className="text-center text-slate-400 mt-10 flex justify-center items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                Type a topic to generate an AI quiz
                            </p>
                        )}

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl text-sm leading-relaxed shadow-sm transition duration-150 ${
                                        msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-sm px-4 py-3" 
                                            : "bg-slate-100 text-slate-800 rounded-tl-sm p-4"
                                    }`}
                                >
                                    {msg.role === "user" ? (
                                        msg.content
                                    ) : Array.isArray(msg.content) ? (
                                        
                                        <div className="space-y-4">
                                            <p className="text-base font-semibold text-slate-900 mb-2">
                                                Quiz generated for:{" "}
                                                {messages[i - 1] && messages[i - 1].role === "user"
                                                ? String(messages[i - 1].content)
                                                : "Topic"}
                                            </p>
                                            
                                            {msg.content.map((q, idx) => (
                                                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm"> 
                                                    <h3 className="font-bold text-slate-800 mb-3">
                                                        {idx + 1}. {q.question}
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {q.options.map((opt, i2) => (
                                                            <li
                                                                key={i2}
                                                                className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-blue-50 cursor-pointer text-slate-700 text-sm transition"
                                                            >
                                                                {opt}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <p className="text-xs text-slate-500 mt-3 pt-2 border-t border-dashed border-slate-200 flex items-center gap-1">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        Correct Answer: <b className="text-slate-800">{q.answer}</b>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        
                                        <div className="whitespace-pre-wrap text-slate-500 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-red-600" />
                                            <span className="text-red-600">{msg.content}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-100 text-slate-500 px-4 py-3 rounded-xl rounded-tl-sm text-sm animate-pulse">
                                    Generating quiz...
                                </div>
                            </div>
                        )}
                       
                        <div className="pt-2" /> 
                    </div>

                    
                    <div className="border-t border-slate-200 p-4 bg-slate-50">
                        <div className="flex items-center gap-3 max-w-4xl mx-auto">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Enter a topic (e.g., Photosynthesis, JavaScript Basics)"
                                
                                className="flex-1 px-5 py-3 border border-slate-300 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                disabled={loading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !topic.trim()}
                                
                                className="px-4 py-2 sm:px-4 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition disabled:opacity-50 shadow-md"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}