"use client";

import { Crown } from "lucide-react";

export default function UpgradeButton({ onClickAction }: { onClickAction: () => void }) {
  return (
    <button
      onClick={onClickAction}
      className="relative group inline-flex items-center gap-2 px-5 py-2.5 
                 rounded-full border border-[#0E2931]/10 bg-white
                 text-[#0E2931] font-black text-[11px] uppercase tracking-[0.2em]
                 shadow-lg shadow-[#0E2931]/5 transition-all duration-500 
                 hover:text-white hover:border-transparent overflow-hidden active:scale-95"
    >
      {/* 1. THE GRADIENT MIXTURE LAYER (Hidden by default, appears on hover) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0E2931] via-[#2B7574] to-[#861211] z-0" />
      
      {/* 2. CONTENT LAYER (Ensures icons/text stay above the gradient) */}
      <div className="relative z-10 flex items-center gap-2">
        <Crown 
          size={16} 
          className="text-[#861211] group-hover:text-white transition-colors duration-300" 
        />
        <span>Pricing</span>
      </div>

      {/* 3. REFLECTIVE GLOW EFFECT */}
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-all duration-500 scale-110 blur-sm"></span>
    </button>
  );
}