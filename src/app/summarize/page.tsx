"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Youtube,
  FileUp,
  FileText,
  Volume2,
  Square,
  Sparkles,
  Brain,
  RotateCcw,
} from "lucide-react";

type SummarizePayload =
  | { source: "youtube"; link: string }
  | { source: "text"; text: string };

export default function SummarizePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center text-[#0E2931]/50 font-black uppercase tracking-widest animate-pulse">Initializing...</div>}>
      <SummarizeContent />
    </Suspense>
  );
}

function SummarizeContent() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledLink = (searchParams?.get("link") ?? "") as string;

  const [source, setSource] = useState<"youtube" | "text" | "upload">("youtube");
  const [link, setLink] = useState(prefilledLink);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (prefilledLink) {
      setSource("youtube");
      setLink(prefilledLink);
    }
  }, [prefilledLink]);

  if (!isLoaded) return <div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center text-[#0E2931]/50 font-black tracking-widest">LOADING...</div>;
  if (!isSignedIn) return <RedirectToSignIn />;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setFileName(f.name);
  }

  async function handleSummarize() {
    setError(null);
    setSummary(null);
    try {
      setLoading(true);
      let response;
      if (source === "youtube" || source === "text") {
        const payload: SummarizePayload = source === "youtube" ? { source: "youtube", link } : { source: "text", text };
        response = await fetch(`${BACKEND_URL}/summarize/api/agent/summarize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (source === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        response = await fetch(`${BACKEND_URL}/summarize/api/agent/upload`, {
          method: "POST",
          body: formData,
        });
      }
      if (!response) throw new Error("No response from server");
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Summarization failed");
      }
      const data = await response.json();
      setSummary(data.output);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(format: "txt" | "pdf") {
    if (!summary) return;
    const response = await fetch(`${BACKEND_URL}/summarize/api/agent/download/${format}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: summary }),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `summary.${format}`;
    a.click();
  }

  async function handleTTS() {
    if (!summary) return;
    const response = await fetch(`${BACKEND_URL}/summarize/api/agent/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: summary }),
    });
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setIsPlaying(true);
    audio.play();
    audio.onended = () => {
      setIsPlaying(false);
      audioRef.current = null;
    };
  }

  function handleStopTTS() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlaying(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#E2E2E0] py-16 px-6 selection:bg-[#861211]/20">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/5 border border-[#0E2931]/5 p-8 md:p-12 transition-all duration-500">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#0E2931] mb-6 uppercase tracking-tighter leading-none">
            Summarize <span className="text-[#861211]">Intelligence</span>
          </h1>
          <p className="text-[#0E2931]/60 text-lg font-medium italic max-w-2xl mx-auto">
            Upload transcripts, paste notes, or share a YouTube link. Bridge the gap between complexity and total clarity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <OptionButton active={source === "youtube"} onClick={() => setSource("youtube")}>
            <Youtube className="w-4 h-4 mr-2" /> YouTube Link
          </OptionButton>
          <OptionButton active={source === "upload"} onClick={() => setSource("upload")}>
            <FileUp className="w-4 h-4 mr-2" /> Upload File
          </OptionButton>
          <OptionButton active={source === "text"} onClick={() => setSource("text")}>
            <FileText className="w-4 h-4 mr-2" /> Paste Text
          </OptionButton>
        </div>

        <div className="mb-10 flex justify-center">
          {source === "upload" ? (
            <label className="block w-full max-w-3xl">
              <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileChange} className="hidden" id="file-input" />
              <div
                onClick={() => document.getElementById("file-input")?.click()}
                className="cursor-pointer bg-[#E2E2E0]/30 hover:bg-[#E2E2E0]/50 border-2 border-dashed border-[#0E2931]/10 px-8 py-12 rounded-[2rem] text-[#0E2931]/60 font-black uppercase tracking-widest text-[10px] transition-all text-center"
              >
                {fileName ? `✅ Dispatching: ${fileName}` : "📂 Dispatch Document (PDF, DOCX, TXT)"}
              </div>
            </label>
          ) : source === "text" ? (
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your lecture transcript or notes here..."
              className="w-full max-w-3xl mx-auto block p-6 bg-[#E2E2E0]/20 border border-[#0E2931]/5 rounded-[2rem] focus:ring-2 focus:ring-[#861211]/10 focus:outline-none text-[#0E2931] placeholder:text-[#0E2931]/30 font-medium leading-relaxed resize-none"
            />
          ) : (
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste your YouTube video link here..."
              className="w-full max-w-3xl mx-auto block p-5 px-8 bg-[#E2E2E0]/20 border border-[#0E2931]/5 rounded-full focus:ring-2 focus:ring-[#861211]/10 focus:outline-none text-[#0E2931] placeholder:text-[#0E2931]/30 font-medium"
            />
          )}
        </div>

        {error && (
          <div className="text-[#861211] text-[10px] font-black uppercase tracking-widest mb-6 bg-[#861211]/5 border border-[#861211]/10 px-4 py-3 rounded-xl flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="bg-[#861211] hover:bg-[#6a0e0d] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-xl shadow-[#861211]/20 hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Synthesizing..." : "Process Summary"}
          </button>

          {summary && (
            <div className="flex items-center gap-3 animate-fade-in">
              {!isPlaying ? (
                <button onClick={handleTTS} className="p-4 rounded-full bg-[#0E2931] text-white hover:bg-[#12484C] transition-all shadow-lg hover:scale-110 active:scale-95"><Volume2 size={20} /></button>
              ) : (
                <button onClick={handleStopTTS} className="p-4 rounded-full bg-[#861211] text-white animate-pulse transition-all shadow-lg active:scale-95"><Square size={20} /></button>
              )}
              <div className="h-8 w-px bg-[#0E2931]/10 mx-2" />
              <button onClick={() => handleDownload("txt")} className="px-6 py-3 rounded-full border border-[#0E2931]/10 text-[#0E2931]/40 hover:text-[#0E2931] hover:bg-[#0E2931]/5 transition-all text-[10px] font-black uppercase tracking-widest">TXT</button>
              <button onClick={() => handleDownload("pdf")} className="px-6 py-3 rounded-full border border-[#0E2931]/10 text-[#0E2931]/40 hover:text-[#0E2931] hover:bg-[#0E2931]/5 transition-all text-[10px] font-black uppercase tracking-widest">PDF</button>
            </div>
          )}

          <button
            onClick={() => {
              setLink(""); setText(""); setSummary(null); setError(null); setFile(null); setFileName(null); handleStopTTS();
            }}
            className="p-4 rounded-full border border-[#0E2931]/5 text-[#0E2931]/20 hover:text-[#861211] transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {summary && (
          <div className="mt-12 bg-[#E2E2E0]/30 rounded-[2.5rem] border border-[#0E2931]/5 p-10 shadow-inner group transition-all duration-500">
            <h3 className="font-black text-xl mb-6 text-[#0E2931] uppercase tracking-tighter flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm"><Brain className="w-6 h-6 text-[#861211]" /></div>
              AI Synthesized Insight
            </h3>
            <div className="text-[#0E2931]/80 text-lg leading-relaxed whitespace-pre-line font-medium italic border-l-4 border-[#861211]/20 pl-8">
              {summary}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/20">
        UAARN Intelligence Module • Secure Encryption Operational
      </div>
    </div>
  );
}

function OptionButton({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void; }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full border transition-all text-[10px] font-black uppercase tracking-widest flex items-center ${
        active
          ? "bg-[#0E2931] text-white border-[#0E2931] shadow-xl scale-105"
          : "bg-white text-[#0E2931]/40 border-[#0E2931]/5 hover:bg-[#E2E2E0]/50 hover:text-[#0E2931]"
      }`}
    >
      {children}
    </button>
  );
}