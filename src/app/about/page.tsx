"use client";
import Link from "next/link";
import Image from "next/image";
import { Target, Lightbulb, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    /* Main Background: Soft Bone White (#E2E2E0) */
    <div className="bg-[#E2E2E0] text-[#0E2931] px-6 py-10 flex flex-col items-center w-full relative overflow-hidden selection:bg-[#861211]/20 font-sans">

      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2B7574]/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#861211]/5 blur-[120px] rounded-full -z-10" />

      {/* --- RESTORED & REFINED HEADING SECTION --- */}
      <div className="max-w-4xl text-center space-y-10 pt-20 pb-24">

        <h2 className="text-6xl md:text-6xl font-black text-[#0E2931] tracking-tighter uppercase leading-[0.85]">
          About{" "}
          <Link href="/">
            <span className="bg-gradient-to-r from-[#2B7574] via-[#861211] to-[#12484C] bg-clip-text text-transparent italic pr-3 inline-block">
              UAARN
            </span>
          </Link>
        </h2>

        <div className="space-y-8 max-w-3xl mx-auto">
          <p className="text-[#0E2931]/80 leading-relaxed text-2xl md:text-3xl font-light italic">
            UAARN is a high-fidelity educational ecosystem designed to make learning
            <span className="text-[#861211] font-black not-italic px-2">faster, smarter, and more intuitive</span>.
          </p>
          <div className="h-[1px] w-24 bg-[#861211]/30 mx-auto" />
        </div>
      </div>

      {/* --- BRAND PILLARS SECTION --- */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-40 relative z-10">
        <PillarCard
          icon={<Target size={24} />}
          title="Precision"
          desc="Laser-focused explanations that cut through academic complexity."
        />
        <PillarCard
          icon={<Lightbulb size={24} />}
          title="Innovation"
          desc="Leveraging high-fidelity AI models to personalize neural paths."
        />
        <PillarCard
          icon={<Shield size={24} />}
          title="Resilience"
          desc="Building a robust network of knowledge that adapts to every learner."
        />
      </div>

      {/* --- MISSION STATEMENT SECTION --- */}
      <div className="w-full max-w-4xl bg-[#0E2931] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-40 shadow-2xl">
         <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/5 rounded-tr-[3rem]" />
         <p className="relative z-10 text-[#E2E2E0]/40 text-[10px] font-black uppercase tracking-[0.5em] mb-8">The Mission</p>
         <h3 className="relative z-10 text-[#E2E2E0] text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight italic">
          &quot;To democratize education through technology — helping every learner access knowledge and clarity instantly.&quot;
         </h3>
      </div>

      {/* Team Section (Kept exactly as requested) */}
      <div className="mt-20 w-full max-w-6xl text-center pb-20">
        <h2 className="text-5xl font-black text-[#0E2931] mb-20 uppercase tracking-tighter">
          Meet Our <span className="text-[#861211]">Core Team</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Team Member Card - Maryam */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white border border-[#0E2931]/5 shadow-sm hover:shadow-2xl hover:shadow-[#2B7574]/10 transition-all duration-500 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#861211] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full"></div>
              <Image
                src="/maryam.jpeg"
                alt="Maryam Arif"
                width={130}
                height={130}
                className="relative rounded-full object-cover border-4 border-[#E2E2E0] grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
              />
            </div>
            <h3 className="text-2xl font-black text-[#0E2931]">Maryam Arif</h3>
            <p className="text-[#861211] font-bold text-xs tracking-widest uppercase mt-2">Founder & Managing Lead</p>
            <p className="text-[#0E2931]/50 text-sm mt-6 leading-relaxed font-medium">
              Leads AI development, system automation, and OpenAI Agents SDK integration.
            </p>
          </div>

          {/* Team Member Card - Mehak */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white border border-[#0E2931]/5 shadow-sm hover:shadow-2xl hover:shadow-[#2B7574]/10 transition-all duration-500 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#861211] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full"></div>
              <Image
                src="/mehak.jpg"
                alt="Mehak Akram"
                width={130}
                height={130}
                className="relative rounded-full object-cover border-4 border-[#E2E2E0] grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
              />
            </div>
            <h3 className="text-2xl font-black text-[#0E2931]">Mehak Akram</h3>
            <p className="text-[#861211] font-bold text-xs tracking-widest uppercase mt-2">Co-Founder & Backend Lead</p>
            <p className="text-[#0E2931]/50 text-sm mt-6 leading-relaxed font-medium">
              Manages backend architecture, APIs, databases, and system reliability.
            </p>
          </div>

          {/* Team Member Card - Tahirah */}
          <div className="group relative p-10 rounded-[2.5rem] bg-white border border-[#0E2931]/5 shadow-sm hover:shadow-2xl hover:shadow-[#2B7574]/10 transition-all duration-500 flex flex-col items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#861211] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full"></div>
              <Image
                src="/tahira.jpg"
                alt="Tahirah Roohi"
                width={130}
                height={130}
                className="relative rounded-full object-cover border-4 border-[#E2E2E0] grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
              />
            </div>
            <h3 className="text-2xl font-black text-[#0E2931]">Tahirah Roohi</h3>
            <p className="text-[#861211] font-bold text-xs tracking-widest uppercase mt-2">Co-Founder & Frontend Lead</p>
            <p className="text-[#0E2931]/50 text-sm mt-6 leading-relaxed font-medium">
              Designs modern interfaces and improves user experience for the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/50 border border-[#0E2931]/5 p-8 rounded-[2rem] hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl group">
      <div className="text-[#861211] mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-lg font-black text-[#0E2931] uppercase tracking-tighter mb-2">{title}</h4>
      <p className="text-[#0E2931]/50 text-sm leading-relaxed italic">{desc}</p>
    </div>
  );
}