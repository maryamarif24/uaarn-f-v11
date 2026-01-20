"use client";

import { useUser, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GraduationCap, Presentation, ArrowRight } from "lucide-react";

export default function SelectRolePage() {
  const { isLoaded: isUserLoaded, user } = useUser();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const router = useRouter();

  const isClerkReady = isUserLoaded && isSessionLoaded && user && session;

  const handleRoleSelect = async (role: string) => {
    if (!isClerkReady) {
        console.error("Clerk data not ready. Click ignored.");
        return;
    }

    try {
      await user.update({
        unsafeMetadata: { role },
      });

      await session.reload();

      if (role === "Teacher") {
          router.push("/teacher-dashboard");
      } else if (role === "Student") {
          router.push("/student-dashboard");
      }

    } catch (error) {
      console.error("Error during role selection/token refresh:", error);
      alert("Failed to set role. Please log out and log back in, then try again.");
    }
  };

  if (!isUserLoaded || !isSessionLoaded) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#E2E2E0]">
        <div className="w-12 h-12 border-4 border-[#0E2931]/10 border-t-[#861211] rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/40">Synchronizing Identity...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen mb-0 pt-10 flex flex-col items-center justify-center bg-[#E2E2E0] px-6 pb-10 text-center relative overflow-hidden selection:bg-[#861211]/20">

      {/* Organic Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#2B7574]/10 to-transparent blur-[120px] rounded-full -z-10" />

      {/* Heading Section */}
      <div className="max-w-2xl mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/60 text-[10px] font-black uppercase tracking-[0.3em] ">
          Identity Configuration • UAARN v9
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#0E2931] tracking-tighter uppercase leading-[0.9]">
          Define Your <span className="text-[#861211] italic pr-2">Role</span>
        </h1>
        <p className="text-[#0E2931]/60 text-lg font-medium italic">
          Select your operational path to initialize your personalized <br className="hidden md:block"/> high-fidelity learning dashboard.
        </p>
      </div>

      {/* Role Selection Matrix */}
      <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10 w-full max-w-5xl">

        {/* Teacher Card */}
        <button
          onClick={() => handleRoleSelect("Teacher")}
          disabled={!isClerkReady}
          className="group relative flex-1 bg-white border border-[#0E2931]/10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 disabled:opacity-50 text-left overflow-hidden min-h-[380px] p-10 flex flex-col"
        >
          {/* Background Matrix Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E2931_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-8 w-12 h-12 bg-[#0E2931] rounded-xl flex items-center justify-center text-white group-hover:bg-[#861211] transition-colors duration-500 shadow-lg">
              <Presentation size={24} />
            </div>

            <h3 className="text-2xl font-black text-[#0E2931] uppercase tracking-tighter mb-4 group-hover:text-[#861211] transition-colors">
              Teacher Path
            </h3>

            <p className="text-[#0E2931]/60 text-sm font-medium leading-relaxed mb-10 border-l-2 border-[#0E2931]/5 pl-4">
              Architect intelligence paths, manage student resilience, and curate high-fidelity content for your network.
            </p>

            <div className="mt-auto flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0E2931]/40">Access Level: Admin</span>
                <div className="w-10 h-10 rounded-full border border-[#0E2931]/10 flex items-center justify-center group-hover:bg-[#861211] group-hover:text-white group-hover:border-transparent transition-all">
                    <ArrowRight size={16} />
                </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#861211] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>

        {/* Student Card */}
        <button
          onClick={() => handleRoleSelect("Student")}
          disabled={!isClerkReady}
          className="group relative flex-1 bg-white border border-[#0E2931]/10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 disabled:opacity-50 text-left overflow-hidden min-h-[380px] p-10 flex flex-col"
        >
          {/* Background Matrix Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E2931_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-8 w-12 h-12 bg-[#0E2931] rounded-xl flex items-center justify-center text-white group-hover:bg-[#2B7574] transition-colors duration-500 shadow-lg">
              <GraduationCap size={24} />
            </div>

            <h3 className="text-2xl font-black text-[#0E2931] uppercase tracking-tighter mb-4 group-hover:text-[#2B7574] transition-colors">
              Student Path
            </h3>

            <p className="text-[#0E2931]/60 text-sm font-medium leading-relaxed mb-10 border-l-2 border-[#0E2931]/5 pl-4">
              Access precision modules, track neural progress, and master complex topics with AI-powered study companions.
            </p>

            <div className="mt-auto flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0E2931]/40">Access Level: Learner</span>
                <div className="w-10 h-10 rounded-full border border-[#0E2931]/10 flex items-center justify-center group-hover:bg-[#2B7574] group-hover:text-white group-hover:border-transparent transition-all">
                    <ArrowRight size={16} />
                </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2B7574] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>
      </div>
    </section>
  );
}