import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen, FileText, Brain, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboard() {
  const user = await currentUser();

  if (!user) {
    redirect(`/sign-in?redirect_url=/student-dashboard`);
  }

  return (
    <main className="min-h-screen bg-[#E2E2E0] flex items-center justify-center p-6 selection:bg-[#861211]/20 font-sans">
      
      {/* Structural Container */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-7xl overflow-hidden flex flex-col md:flex-row min-h-[750px] shadow-2xl">
        
        {/* 1st COLUMN: LAYERED SIDEBAR WITH CRIMSON ISLAND */}
        <div className="w-full md:w-[40%] relative bg-[#0E2931] text-[#E2E2E0] p-12 md:p-16 flex flex-col justify-between overflow-hidden">
          
          {/* Background Layering Shapes matching Contact Page style */}
          <div className="absolute inset-0 z-0 bg-[#12484C]" />
          
          <div 
            className="absolute inset-0 z-0 bg-[#2B7574]" 
            style={{ clipPath: 'ellipse(90% 60% at 10% 40%)', opacity: 0.6 }}
          />
          
          <div 
            className="absolute inset-0 z-0 bg-[#E2E2E0]" 
            style={{ clipPath: 'polygon(100% 30%, 60% 50%, 80% 80%, 100% 90%)', opacity: 0.1 }}
          />
          
          {/* THE RED THING: Crimson Island Shape */}
          <div 
            className="absolute bottom-0 right-0 w-[90%] h-[65%] z-0 bg-[#861211]" 
            style={{ clipPath: 'polygon(100% 20%, 30% 70%, 50% 100%, 100% 100%)', opacity: 0.85 }}
          />
          
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0E2931]/80 via-transparent to-transparent" />

          {/* SIDEBAR CONTENT */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.3em] mb-12">
              <GraduationCap size={10} className="text-[#E2E2E0]" /> 
              AUTHORIZED LEARNER HUB
            </div>
            
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Welcome, <br />
              <span className="text-white drop-shadow-[2px_2px_2px_rgba(134,18,17,0.8)]">
                {user.firstName || "Student"}
              </span>
            </h1>
            
            <p className="text-[#E2E2E0]/80 text-lg font-medium italic leading-relaxed max-w-xs mb-12">
              Access precision modules, track neural progress, and master topics with AI-powered study companions.
            </p>

            <div className="relative w-24 h-24 group">
              <div className="absolute inset-0 bg-white rounded-3xl blur-md opacity-10 group-hover:opacity-30 transition-opacity" />
              <Image
                src={user.imageUrl || "/default-avatar.png"}
                alt="Student avatar"
                width={96}
                height={96}
                className="relative w-24 h-24 rounded-3xl border-2 border-white/20 object-cover shadow-2xl transition-transform group-hover:scale-105"
                unoptimized
              />
            </div>
          </div>

          <div className="relative z-10 space-y-2 opacity-40 pt-12">
             <div className="text-[10px] font-black uppercase tracking-[0.5em]">Neural Link: Stable</div>
             <div className="text-[10px] font-black uppercase tracking-[0.5em]">Identity Profile: Verified Student</div>
          </div>
        </div>

        {/* 2nd COLUMN: MODULAR ACTION ZONE */}
        <div className="w-full md:w-[60%] bg-[#E2E2E0] p-10 md:p-14 flex flex-col justify-center">
          
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-xs font-black text-[#0E2931] uppercase tracking-[0.3em] whitespace-nowrap">
              Learning Operations
            </h3>
            <div className="h-px w-full bg-[#0E2931]/10" />
          </div>

          <div className="flex flex-col gap-6">
            <DashboardCard 
              href="/courses"
              icon={<BookOpen size={24} />}
              title="View Courses"
              description="Browse, enroll, and continue your high-fidelity learning journey."
              accentColor="group-hover:bg-[#2B7574]"
              hoverBorder="hover:border-[#2B7574]/20"
            />

            <DashboardCard 
              href="/student-dashboard/uploaded-notes"
              icon={<FileText size={24} />}
              title="My Notes"
              description="Access and download neural assets shared by your architects."
              accentColor="group-hover:bg-[#0E2931]"
              hoverBorder="hover:border-[#0E2931]/20"
            />

            <DashboardCard 
              href="/quiz"
              icon={<Brain size={24} />}
              title="Generate Quiz"
              description="Initialize AI-powered assessments based on course materials."
              accentColor="group-hover:bg-[#861211]"
              hoverBorder="hover:border-[#861211]/20"
            />
          </div>

          <div className="mt-16 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/30">
              UAARN Resilience Network • Secure Channel Operational
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function DashboardCard({ href, icon, title, description, accentColor, hoverBorder }: { 
  href: string; 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  accentColor: string;
  hoverBorder: string;
}) {
  return (
    <Link href={href} className={`group bg-white rounded-[2rem] p-8 flex items-center justify-between border-2 border-transparent ${hoverBorder} transition-all duration-300 shadow-lg shadow-[#0E2931]/5 hover:shadow-2xl`}>
      <div className="flex items-center gap-8">
        {/* ADDED flex-shrink-0 HERE */}
        <div className={`w-16 h-16 flex-shrink-0 bg-[#0E2931] rounded-2xl flex items-center justify-center text-white shadow-xl transition-all duration-500 ${accentColor} group-hover:-rotate-6`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter mb-1">
            {title}
          </h2>
          <p className="text-[#0E2931]/50 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {/* ALSO ADDED flex-shrink-0 TO THE ARROW CONTAINER TO PREVENT IT SQUASHING */}
      <div className="w-12 h-12 flex-shrink-0 rounded-full border border-[#0E2931]/10 flex items-center justify-center text-[#0E2931]/20 group-hover:text-[#0E2931] transition-all">
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}