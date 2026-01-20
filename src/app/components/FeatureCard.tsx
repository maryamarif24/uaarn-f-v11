"use client";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export default function FeatureCard({ title, desc, icon: Icon }: FeatureCardProps) {
  return (
    <div className="relative group flex flex-col items-start text-left p-10 bg-white rounded-[2.5rem] border border-[#0E2931]/5 shadow-sm hover:shadow-2xl hover:shadow-[#2B7574]/10 transition-all duration-500 overflow-hidden h-full">
      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#0E2931]/5 group-hover:border-[#861211]/30 transition-all duration-500 rounded-tr-[2.5rem]" />

      {/* Icon Wrapper */}
      <div className="relative mb-8">
        {/* Organic Glow behind icon using Mid-Teal (#2B7574) */}
        <div className="absolute inset-0 bg-[#2B7574]/20 blur-2xl rounded-full group-hover:bg-[#861211]/20 transition-all duration-500" />
        
        {/* Icon Container - Using Crimson (#861211) as the base color */}
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-[#861211]/10 border border-[#861211]/20 group-hover:bg-[#861211] transition-all duration-500 shadow-sm">
          <Icon 
            className="w-8 h-8 text-[#861211] group-hover:text-white transition-colors duration-500" 
            strokeWidth={1.8} 
          />
        </div>
      </div>

      {/* Typography */}
      <div className="flex-grow space-y-4">
        <h4 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter flex items-center gap-3">
          {title}
          <span className="w-0 h-[2px] bg-[#861211] group-hover:w-8 transition-all duration-500" />
        </h4>
        
        <p className="text-[#0E2931]/70 text-sm leading-relaxed font-medium">
          {desc}
        </p>
      </div>

      {/* Bottom Status Indicator */}
      <div className="mt-8 flex items-center gap-2">
        {/* Pulsing dot using Deep Teal or Crimson */}
        <div className="w-2 h-2 rounded-full bg-[#861211]/40 group-hover:bg-[#861211] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E2931]/40 group-hover:text-[#0E2931] transition-colors">
          Engineered Module
        </span>
      </div>
    </div>
  );
}