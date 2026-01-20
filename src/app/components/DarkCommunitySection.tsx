import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DarkCommunitySection: React.FC = () => {
  return (
    /* Main Page Background: Bone White (#E2E2E0) */
    <div className="min-h-screen bg-[#E2E2E0] py-18 px-4 sm:px-6 lg:px-8 selection:bg-[#861211]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-20 text-center relative">
          <div className="inline-block px-4 py-1 mb-6 border border-[#0E2931]/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]/60">
            Collective Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0E2931] mb-6 uppercase tracking-tighter leading-none">
            Join the <span className="text-[#861211] italic">Community</span>
          </h1>
          <div className="w-24 h-1 bg-[#861211] mx-auto mb-8" />
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#0E2931]/70 font-medium leading-relaxed">
            <Link href="/">
              <span className="font-black hover:text-[#861211] transition-colors cursor-pointer">UAARN </span>
            </Link>
            is the definitive ecosystem for resilient AI development and strategic collaboration.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Developers */}
          <div className="relative group overflow-hidden bg-[#0E2931] rounded-[2.5rem] p-10 text-[#E2E2E0] shadow-2xl transition-transform hover:-translate-y-2 duration-500">
            {/* Background Organic Shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B7574]/20 blur-3xl rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center text-center h-full">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E2E2E0]/50 mb-4">
                Global Standing
              </p>
              <p className="font-bold text-lg leading-tight mb-6">
                Among 1% of <br/>Top Developers
              </p>
              <p className="text-5xl font-black text-[#861211] mb-2 tracking-tighter">
                500+
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8">Stars on GitHub</p>
              
              <div className="flex -space-x-3 mt-auto">
                {['maryam.jpeg', 'tahira.jpg', 'mehak.jpg'].map((img, i) => (
                  <div key={i} className="relative w-12 h-12 rounded-full border-4 border-[#0E2931] overflow-hidden hover:z-20 hover:scale-110 transition-all cursor-pointer">
                    <Image
                      src={`/${img}`}
                      alt="Contributor"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Satisfied Users (The "Red Island" Card) */}
          <div className="relative group overflow-hidden bg-[#861211] rounded-[2.5rem] p-10 text-white shadow-2xl transition-transform hover:-translate-y-2 duration-500">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            <div className="relative z-10 flex flex-col items-center text-center h-full">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">
                Network Growth
              </p>
              <p className="font-bold text-lg leading-tight mb-6">
                Active Protocol <br/>Participants
              </p>
              <p className="text-5xl font-black text-[#E2E2E0] mb-2 tracking-tighter">
                50+
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8">Registered Users</p>
              
              <Link href="/contact" className="w-full">
                <div className="bg-[#E2E2E0] text-[#861211] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors text-center">
                  Register Yourself
                </div>
              </Link>
            </div>
          </div>

          {/* Card 3: LinkedIn */}
          <div className="relative group overflow-hidden bg-[#12484C] rounded-[2.5rem] p-10 text-[#E2E2E0] shadow-2xl transition-transform hover:-translate-y-2 duration-500">
            {/* Layered Wave Effect */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#2B7574]/20" style={{ clipPath: 'ellipse(100% 50% at 50% 100%)' }} />
            
            <div className="relative z-10 flex flex-col items-center text-center h-full">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E2E2E0]/50 mb-4">
                Social Presence
              </p>
              <p className="font-bold text-lg leading-tight mb-6">
                Professional <br/>Network Reach
              </p>
              <p className="text-5xl font-black text-[#E2E2E0] mb-2 tracking-tighter">
                1K+
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8">LinkedIn Followers</p>
              
              <a 
                href="https://www.linkedin.com/company/nexa-agent/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full mt-auto"
              >
                <div className="border-2 border-[#E2E2E0]/20 hover:border-[#E2E2E0] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all text-center">
                  LinkedIn
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DarkCommunitySection;