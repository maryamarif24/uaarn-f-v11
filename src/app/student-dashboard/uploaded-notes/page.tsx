"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getNotes } from "@/sanity/lib/client";
import { Sparkles, FileText, Eye, Download, ArrowLeft } from "lucide-react";

type Note = {
  _id: string;
  title: string;
  fileUrl?: string;
  description?: string;
  createdAt: string;
};

export default function UploadedNotesPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    async function fetchNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-[#E2E2E0] p-8 selection:bg-[#861211]/20 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Navigation / Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#0E2931]/40 hover:text-[#861211] font-black text-[10px] uppercase tracking-[0.3em] transition-all mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E2931]/5 border border-[#0E2931]/10 text-[#0E2931]/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <Sparkles size={10} className="text-[#861211]" />
              Neural Asset Repository
            </div>
            <h1 className="text-4xl font-black text-[#0E2931] tracking-tighter uppercase leading-none">
              Uploaded <span className="text-[#861211] italic">Notes</span>
            </h1>
          </div>
        </div>

        {/* Notes Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-32 space-y-4 animate-pulse">
             <div className="w-12 h-12 border-4 border-[#0E2931]/10 border-t-[#861211] rounded-full animate-spin"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/40">Synchronizing Assets...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-[#0E2931]/5 shadow-2xl shadow-[#0E2931]/5">
            <FileText size={48} className="mx-auto text-[#0E2931]/10 mb-6" />
            <p className="text-[#0E2931]/40 text-xs font-black uppercase tracking-[0.3em]">
              No neural assets found in current node.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note._id}
                className="group relative bg-white border border-[#0E2931]/5 rounded-[2rem] p-8 shadow-xl shadow-[#0E2931]/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Matrix Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E2931_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-[#0E2931] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-[#861211] transition-colors duration-500">
                       <FileText size={24} />
                    </div>
                    <span className="text-[9px] font-black text-[#0E2931]/20 uppercase tracking-widest bg-[#E2E2E0]/50 px-3 py-1 rounded-full">
                      ID: {note._id.slice(0, 6)}
                    </span>
                  </div>

                  <h3 className="font-black text-2xl text-[#0E2931] uppercase tracking-tighter mb-4 group-hover:text-[#861211] transition-colors leading-tight">
                    {note.title}
                  </h3>

                  <p className="text-[#0E2931]/60 text-sm font-medium leading-relaxed mb-8 italic border-l-2 border-[#0E2931]/5 pl-5 line-clamp-3">
                    {note.description || "No tactical description provided for this neural asset."}
                  </p>

                  <div className="flex items-center gap-2 mb-8 opacity-40">
                     <div className="w-1 h-1 rounded-full bg-[#2B7574]" />
                     <p className="text-[9px] font-black uppercase tracking-widest text-[#0E2931]">
                        Logged: {note.createdAt.slice(0, 10)}
                     </p>
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="relative z-10 flex gap-4">
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0E2931] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#0E2931]/20 hover:bg-[#12484C] transition-all active:scale-95"
                  >
                    <Eye size={14} /> View
                  </a>

                  <a
                    href={note.fileUrl}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-[#861211] text-[#861211] py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#861211] hover:text-white transition-all active:scale-95"
                  >
                    <Download size={14} /> Download
                  </a>
                </div>

                {/* Hover Slide-up Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#861211] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        )}

        {/* Technical Footer */}
        <div className="mt-20 pt-10 border-t border-[#0E2931]/5 text-center opacity-30">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0E2931]">
             UAARN Resilience Network • Secure Asset Management Operational
           </p>
        </div>
      </div>
    </div>
  );
}