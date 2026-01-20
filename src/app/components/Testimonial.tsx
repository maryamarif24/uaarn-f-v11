"use client";
import React from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechScale Inc.",
      initials: "SC",
      color: "bg-[#2B7574]",
      rating: 5, // 5 out of 5
      text: "UAARN transformed how we approach resilience. We prevent potential downtime with the AI's predictive capabilities.",
    },
    {
      name: "Marcus Thompson",
      role: "VP of Operations, GlobalLogix",
      initials: "MT",
      color: "bg-[#0E2931]",
      rating: 4, // 4 out of 5
      text: "The predictive capabilities are remarkable. They've prevented major incidents that would have cost us millions.",
    },
    {
      name: "Emily Rodriguez",
      role: "Director of IT, Meridian",
      initials: "ER",
      color: "bg-[#861211]",
      rating: 5,
      text: "Implementation was seamless, and the AI started working immediately. Team efficiency increased by 40%.",
    },
    {
      name: "David Park",
      role: "CEO, InnovateCo",
      initials: "DP",
      color: "bg-[#2B7574]",
      rating: 4,
      text: "The personalized recommendations have become essential to our decision-making process. Highly effective.",
    },
    {
      name: "Ayesha Malik",
      role: "Lead Architect, GIAIC",
      initials: "AM",
      color: "bg-[#0E2931]",
      rating: 3,
      text: "A masterclass in educational AI. The depth of the explanations and the high-fidelity UI is unmatched.",
    },
    {
      name: "James Wilson",
      role: "Founder, Nexus Corp",
      initials: "JW",
      color: "bg-[#861211]",
      rating: 4,
      text: "UAARN's infrastructure is built for the future. It has scaled our training protocols beyond expectations.",
    },
  ];

  return (
    <section className="bg-[#E2E2E0] py-20 px-6 relative overflow-hidden font-sans selection:bg-[#861211]/20">

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/60 text-[9px] font-black uppercase tracking-[0.3em]">
            Global Validation
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0E2931] tracking-tighter uppercase leading-none">
            Trusted by <span className="text-[#861211] italic">Industry Leaders</span>
          </h2>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-20">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative bg-[#0E2931] rounded-[2rem] p-8 transition-all duration-500 hover:translate-y-[-5px] shadow-xl border border-white/5 flex flex-col justify-between h-full"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  {/* DYNAMIC RATING LOGIC */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`transition-colors duration-500 ${
                          i < item.rating
                          ? "fill-[#FACC15] text-[#FACC15]" // Gold for rated stars
                          : "fill-[#2B7574]/20 text-[#2B7574]/20" // Muted Teal for empty
                        }`}
                      />
                    ))}
                  </div>
                  <Quote size={28} className="text-white/5 group-hover:text-[#861211]/20 transition-all" />
                </div>

                <p className="text-[#E2E2E0]/80 text-[15px] font-medium leading-relaxed italic mb-8">
                  &quot;{item.text}&quot;
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex-shrink-0 flex items-center justify-center text-white font-black text-[10px] border border-white/10 shadow-md`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[11px]">{item.name}</h4>
                  <p className="text-[#E2E2E0]/40 text-[9px] font-bold uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Bar */}
        <div className="w-full flex flex-col items-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                <span className="text-lg font-black text-[#0E2931] uppercase tracking-tighter">TechScale</span>
                <span className="text-lg font-black text-[#0E2931] uppercase tracking-tighter">GlobalLogix</span>
                <span className="text-lg font-black text-[#0E2931] uppercase tracking-tighter">Meridian</span>
                <span className="text-lg font-black text-[#0E2931] uppercase tracking-tighter">InnovateCo</span>
                <span className="text-lg font-black text-[#0E2931] uppercase tracking-tighter">Nexus Corp</span>
            </div>
        </div>
      </div>
    </section>
  );
}