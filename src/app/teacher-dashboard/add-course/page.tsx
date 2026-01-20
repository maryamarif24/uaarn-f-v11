"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Upload, ArrowLeft, ShieldCheck } from "lucide-react";

export default function AddCourse() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      Swal.fire({
        title: "⚠️ No Image Selected",
        text: "Please upload an image before submitting.",
        icon: "warning",
        confirmButtonColor: "#861211",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.error || "Failed to upload image");
      }

      const response = await fetch("/api/add-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          platform,
          image: uploadData.url,
          link,
          teacherEmail: user?.primaryEmailAddress?.emailAddress || "",
        }),
      });

      const result = await response.json();
      if (result.success) {
        await Swal.fire({
          title: "✅ Course Added!",
          text: "Your course has been added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/teacher-dashboard");
      } else {
        throw new Error(result.error || "Failed to add course");
      }
    } catch (error: unknown) {
      Swal.fire({
        title: "❌ Failed to Add Course",
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

        {/* 1st COLUMN: LAYERED SIDEBAR (Consistent with Dashboards) */}
        <div className="w-full md:w-[40%] relative bg-[#0E2931] text-[#E2E2E0] p-12 md:p-16 flex flex-col justify-between overflow-hidden">

          {/* Background Layering Shapes */}
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
              CURRICULUM ARCHITECT
            </div>

            <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Add New <br />
              <span className="text-white drop-shadow-[2px_2px_2px_rgba(134,18,17,0.8)]">
                Course
              </span>
            </h1>

            <p className="text-[#E2E2E0]/80 text-lg font-medium italic leading-relaxed max-w-xs">
              Initialize a new intelligence module and broadcast it to the student resilience network.
            </p>
          </div>

          <div className="relative z-10 pt-12">
             <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Protocol: Add_Course_v9.0</div>
          </div>
        </div>

        {/* 2nd COLUMN: FORM AREA */}
        <div className="w-full md:w-[60%] bg-[#E2E2E0] p-10 md:p-14 flex flex-col justify-center relative">

          {/* Subtle Grid Pattern for Technical Feel */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E2931_1px,transparent_1px)] [background-size:30px_30px]" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            {/* Title */}
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#0E2931]/5">
              <label className="block text-[#0E2931]/60 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Identification</label>
              <input
                type="text"
                placeholder="COURSE TITLE (E.G. NEURAL NETWORKS)"
                className="w-full bg-[#E2E2E0]/20 border border-[#0E2931]/5 p-4 rounded-xl focus:ring-2 focus:ring-[#861211]/20 outline-none text-[#0E2931] font-bold text-xs tracking-widest"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {/* Platform */}
                <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#0E2931]/5">
                    <label className="block text-[#0E2931]/60 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Platform</label>
                    <input
                        type="text"
                        placeholder="E.G. YOUTUBE"
                        className="w-full bg-[#E2E2E0]/20 border border-[#0E2931]/5 p-4 rounded-xl focus:ring-2 focus:ring-[#861211]/20 outline-none text-[#0E2931] font-bold text-xs tracking-widest"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    />
                </div>

                {/* Link */}
                <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#0E2931]/5">
                    <label className="block text-[#0E2931]/60 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Resource URL</label>
                    <input
                        type="url"
                        placeholder="HTTPS://UAARN.NODE/LINK"
                        className="w-full bg-[#E2E2E0]/20 border border-[#0E2931]/5 p-4 rounded-xl focus:ring-2 focus:ring-[#861211]/20 outline-none text-[#0E2931] font-bold text-xs tracking-widest"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Image Upload: Industrial Styled */}
            <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-[#0E2931]/5">
              <label className="block text-[#0E2931]/60 font-black text-[10px] uppercase tracking-[0.2em] mb-4 text-center">Visual Component Sync</label>
              <div className="border-2 border-dashed border-[#0E2931]/10 rounded-2xl p-6 text-center hover:border-[#861211]/30 transition-all group relative bg-[#E2E2E0]/10">
                <Upload className="w-6 h-6 mx-auto text-[#0E2931]/20 mb-3 group-hover:text-[#861211]/50 transition-colors" />
                <p className="text-[#0E2931]/40 text-[9px] font-black uppercase tracking-widest">
                  {imageFile ? `Ready: ${imageFile.name}` : "Drag Asset or Click to Sync"}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
              {loading ? "TRANSMITTING DATA..." : "ADD COURSE TO NETWORK"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}