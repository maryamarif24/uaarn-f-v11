"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { UploadCloud, ShieldCheck, ArrowLeft } from "lucide-react";

export default function UploadNotes() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        title: "⚠️ No File Selected",
        text: "Please upload a file before submitting.",
        icon: "warning",
        confirmButtonColor: "#861211",
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ Step 1: Upload file to Sanity
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.assetId) {
        throw new Error(uploadData.error || "Failed to upload file");
      }

      // ✅ Step 2: Save note to Sanity
      const response = await fetch("/api/add-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          fileAssetId: uploadData.assetId,
          teacher: user?.primaryEmailAddress?.emailAddress || "Unknown",
        }),
      });

      const result = await response.json();

      if (result.success) {
        await Swal.fire({
          title: "✅ Note Uploaded!",
          text: "Your note has been successfully uploaded.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/teacher-dashboard");
      } else {
        throw new Error(result.error || "Failed to add note");
      }
    } catch (error: unknown) {
      console.error("Upload failed:", error);
      Swal.fire({
        title: "❌ Upload Failed",
        text: error instanceof Error ? error.message : "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#861211",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#E2E2E0] flex items-center justify-center p-6 selection:bg-[#861211]/20 font-sans">

      {/* Structural Container: 10px Deep Teal Frame */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col md:flex-row min-h-[750px]">

        {/* 1st COLUMN: THEMED LAYERED SIDEBAR */}
        <div className="w-full md:w-[40%] relative bg-[#0E2931] text-[#E2E2E0] p-12 md:p-16 flex flex-col justify-between overflow-hidden">

          {/* Background Layering Shapes (Teal curves + Crimson island) */}
          <div className="absolute inset-0 z-0 bg-[#12484C]" />
          <div className="absolute inset-0 z-0 bg-[#2B7574]" style={{ clipPath: 'ellipse(90% 60% at 10% 40%)', opacity: 0.6 }} />
          <div className="absolute inset-0 z-0 bg-[#E2E2E0]" style={{ clipPath: 'polygon(100% 30%, 60% 50%, 80% 80%, 100% 90%)', opacity: 0.1 }} />
          <div className="absolute bottom-0 right-0 w-[90%] h-[60%] z-0 bg-[#861211]" style={{ clipPath: 'polygon(100% 20%, 30% 70%, 50% 100%, 100% 100%)', opacity: 0.85 }} />

          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0E2931]/80 via-transparent to-transparent" />

          {/* SIDEBAR CONTENT */}
          <div className="relative z-10">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white font-black text-[9px] uppercase tracking-[0.3em] transition-all mb-12 group"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              Return to Terminal
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.3em] mb-8">
              <ShieldCheck size={10} className="text-[#861211]" />
              SECURE ASSET SYNC
            </div>

            <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Upload <br />
              <span className="text-white drop-shadow-[2px_2px_2px_rgba(134,18,17,0.8)]">
                Notes
              </span>
            </h1>

            <p className="text-[#E2E2E0]/80 text-lg font-medium italic leading-relaxed max-w-xs">
              Upload tactical lecture materials, research PDFs, or neural study assets for network distribution.
            </p>
          </div>

          <div className="relative z-10 pt-12">
             <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Channel: Resource_Upload_v9.2</div>
          </div>
        </div>

        {/* 2nd COLUMN: MODULAR ACTION ZONE */}
        <div className="w-full md:w-[60%] bg-[#E2E2E0] p-10 md:p-14 flex flex-col justify-center relative">

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E2931_1px,transparent_1px)] [background-size:30px_30px]" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">

            {/* Title Entry */}
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#0E2931]/5">
              <label className="block text-[#0E2931]/60 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Asset Identification</label>
              <input
                type="text"
                placeholder="E.G. CHAPTER 02 - THERMODYNAMICS"
                className="w-full bg-[#E2E2E0]/20 border border-[#0E2931]/5 p-4 rounded-xl focus:ring-2 focus:ring-[#861211]/20 outline-none text-[#0E2931] font-bold text-xs tracking-widest"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description Entry */}
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#0E2931]/5">
              <label className="block text-[#0E2931]/60 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Tactical Summary</label>
              <textarea
                placeholder="INPUT BRIEF OVERVIEW OF THE CONTENT..."
                className="w-full bg-[#E2E2E0]/20 border border-[#0E2931]/5 p-4 rounded-xl focus:ring-2 focus:ring-[#861211]/20 outline-none text-[#0E2931] font-bold text-xs tracking-widest min-h-[120px] resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* File Sync Terminal */}
            <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-[#0E2931]/5">
              <label className="block text-[#0E2931]/60 font-black text-[10px] uppercase tracking-[0.2em] mb-4 text-center">Neural Asset Sync</label>
              <div className="border-2 border-dashed border-[#0E2931]/10 rounded-2xl p-8 text-center hover:border-[#861211]/30 transition-all group relative bg-[#E2E2E0]/10">
                <UploadCloud className="w-8 h-8 mx-auto text-[#0E2931]/20 mb-3 group-hover:text-[#861211]/50 transition-colors" />
                <p className="text-[#0E2931]/40 text-[9px] font-black uppercase tracking-widest mb-2">
                  {file ? `Asset Ready: ${file.name}` : "Sync File: PDF, DOCX, or Images"}
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-6 rounded-2xl transition-all font-black uppercase tracking-[0.4em] text-xs shadow-xl ${
                loading
                  ? "bg-[#861211]/50 cursor-not-allowed text-white/50"
                  : "bg-[#861211] text-white hover:bg-[#6a0e0d] hover:shadow-[#861211]/30 active:scale-[0.98]"
              }`}
            >
              {loading ? "SYNCING ASSETS..." : "INITIALIZE UPLOAD"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}