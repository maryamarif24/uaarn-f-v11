"use client";

import Link from "next/link";
import { X, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";
import { ReactElement } from "react";

interface PlanCardProps {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  icon: ReactElement;
  accentColor: string;
  buttonText: string;
  link: string;
  isPopular?: boolean;
}

export default function PlansModal({ onCloseAction }: { onCloseAction: () => void }) {
  return (
    /* Increased Z-Index to 9999 to ensure it sits above the sticky Navbar */
    <div className="fixed inset-0 flex items-center justify-center bg-[#0E2931]/90 backdrop-blur-md z-[9999] p-4 selection:bg-[#861211]/20 font-sans animate-in fade-in duration-300">

      {/* Container with explicit dimensions and higher relative z-index */}
      <div className="relative bg-[#E2E2E0] rounded-[2.5rem] shadow-2xl border-[4px] md:border-[8px] border-[#0E2931] w-full max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden z-[10000]">

        {/* Subtle Matrix Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0E2931_1px,transparent_1px)] [background-size:30px_30px]" />

        {/* Close Button: Fixed to top right of modal */}
        <button
          onClick={onCloseAction}
          className="absolute top-6 right-6 z-[10010] p-2 bg-[#0E2931] text-white rounded-xl hover:bg-[#861211] transition-all active:scale-95 shadow-lg"
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="relative z-10 pt-16 pb-10 px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0E2931]/10 text-[#0E2931]/60 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Sparkles size={10} className="text-[#861211]" />
                Tactical Acquisition Hub
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0E2931] tracking-tighter uppercase leading-tight">
                Select Your <span className="text-[#861211] italic">Intelligence Path</span>
            </h2>
        </div>

        {/* Plans Matrix Section */}
        <div className="relative z-10 px-6 sm:px-10 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

            <PlanCard
              title="Starter Node"
              price="$99"
              subtitle="Ideal for individuals"
              features={["1 prebuilt educational agent", "Basic identity customization", "Setup guide documentation", "1-time node configuration", "Simple API integration"]}
              icon={<Zap size={20} />}
              accentColor="bg-[#2B7574]"
              buttonText="Initialize Node"
              link="/sign-in"
            />

            <PlanCard
              title="Resilience Pro"
              price="$199"
              subtitle="Optimized for schools"
              features={["Up to 2 custom-built AI agents", "Full school theme branding", "Subject-focused neural logic", "Priority architect support", "Testing assistance", "1 month support"]}
              icon={<ShieldCheck size={20} />}
              accentColor="bg-[#861211]"
              buttonText="Request Protocol"
              link="/contact"
              isPopular
            />

            <PlanCard
              title="Network Core"
              price="Starts $299"
              subtitle="For large institutions"
              features={["Fully custom multi-agent stack", "Trained on proprietary assets", "Advanced neural analytics", "Dedicated developer channel", "Custom domain setup", "Complete handover"]}
              icon={<Globe size={20} />}
              accentColor="bg-[#0E2931]"
              buttonText="Contact Command"
              link="/contact"
            />

          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ title, price, subtitle, features, icon, accentColor, buttonText, link, isPopular }: PlanCardProps) {
  return (
    <div className={`flex flex-col group relative bg-white border border-[#0E2931]/5 rounded-[2rem] p-8 transition-all duration-500 hover:scale-[1.02] shadow-xl ${isPopular ? 'ring-4 ring-[#861211]/20' : ''}`}>
      <div className="relative z-10 flex-grow">
        <div className={`w-12 h-12 ${accentColor} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-2xl font-black text-[#0E2931] uppercase tracking-tighter mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-black text-[#0E2931]">{price}</span>
            <span className="text-[10px] font-black uppercase text-[#0E2931]/40 tracking-widest">/ one-time</span>
        </div>
        <p className="text-[#861211] text-[10px] font-black uppercase tracking-widest mb-8">{subtitle}</p>
        <ul className="space-y-4 mb-10">
          {features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[#0E2931]/60 text-sm font-medium italic leading-tight">
              <div className={`mt-1 w-1.5 h-1.5 rounded-full ${accentColor}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Link href={link} className="relative z-10">
        <button className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] text-white shadow-xl transition-all ${accentColor} hover:brightness-110`}>
          {buttonText}
        </button>
      </Link>
    </div>
  );
}