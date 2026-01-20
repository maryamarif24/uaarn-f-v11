"use client";
import Link from "next/link";
import FeatureCard from "./components/FeatureCard";
import { Sparkles, ShieldCheck, Code, ArrowRight } from "lucide-react";
import ContactPage from "./contact/page";
import AboutPage from "./about/page";
import DarkCommunitySection from "./components/DarkCommunitySection";
import CareerSection from "./components/CareerSection";
import TestimonialsSection from "./components/Testimonial";

export default function HomePage() {
  return (
    <div className="bg-[#E2E2E0] text-[#0E2931] selection:bg-[#861211]/20 min-h-screen overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-32 px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#2B7574]/10 to-transparent blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0E2931]/10 bg-white shadow-sm text-[#0E2931] text-xs font-bold uppercase tracking-widest mb-10 animate-fade-in">
            <Sparkles size={14} className="text-[#2B7574]" />
            <span>AI-Powered Evolution in Learning</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0E2931] leading-[0.9] mb-8">
            Master Any Topic with <br />
            <span className="bg-gradient-to-r from-[#2B7574] via-[#861211] to-[#12484C] bg-clip-text text-transparent italic pr-4 pb-3 inline-block">
              Precision Intelligence
            </span>
          </h1>

          <p className="mt-0 text-lg md:text-xl text-[#0E2931]/70 max-w-2xl leading-relaxed font-medium">
            UAARN is your premium AI-powered study companion. Bridge the gap 
            between complexity and clarity with high-fidelity explanations.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link
              href="/ask"
              className="group px-10 py-4 bg-[#861211] hover:bg-[#6a0e0d] text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-[#861211]/20 hover:scale-105"
            >
              <span className="flex items-center gap-2 text-sm uppercase tracking-widest">
                Start Learning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              href="/about"
              className="px-10 py-4 border-2 border-[#0E2931] hover:bg-[#0E2931] hover:text-white text-[#0E2931] font-bold rounded-full transition-all text-sm uppercase tracking-widest"
            >
              The UAARN Method
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {/* About Section - bg-transparent to allow Home's color to show through */}
        <section className="py-24 bg-transparent border-y border-[#0E2931]/5">
            <AboutPage />
        </section>

        {/* Features Section */}
        <section className="py-24 px-8 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-20">
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-5xl font-black text-[#0E2931] mb-4 uppercase tracking-tighter">
                  Engineered for <span className="text-[#861211]">Excellence</span>
                </h3>
                <p className="text-[#0E2931]/60 text-lg font-medium italic">
                  Industry-leading features for high-performance learners.
                </p>
              </div>
              <div className="mt-8 h-[2px] w-24 bg-[#0E2931]/10"></div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Smart AI"
                desc="Context-aware algorithms that adapt to your specific learning style and pace."
                icon={Sparkles} 
              />
              <FeatureCard
                title="Secure Platform"
                desc="Enterprise-grade security ensuring your intellectual property remains private."
                icon={ShieldCheck}
              />
              <FeatureCard
                title="Developer Friendly"
                desc="Built with modern technologies for easy customization and speed."
                icon={Code}
              />
            </div>
          </div>
        </section>

        {/* Sub-sections - All forced to bg-transparent */}
        <div className="bg-transparent"><CareerSection /></div>
        <div className="bg-transparent"><TestimonialsSection /></div>
        <div className="bg-transparent"><ContactPage /></div>
        <div className="bg-transparent"><DarkCommunitySection /></div>
      </div>
    </div>
  );
}