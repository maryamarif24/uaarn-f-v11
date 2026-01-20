import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    /* Background: Deep Teal (#0E2931) | Top Border: Mid-Teal Accent (#2B7574) */
    <footer className="bg-[#0E2931] border-t border-[#2B7574]/20 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Mission - Spans 2 columns for a solid visual base */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <div className="relative w-40 h-12">
                <Image 
                  src="/logo2.png" 
                  alt="UAARN Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-[#E2E2E0]/70 text-sm md:text-base leading-relaxed max-w-md font-medium italic">
              Empowering the next generation of learners with high-fidelity AI intelligence. 
              Bridging the gap between complex information and total clarity.
            </p>
          </div>

          {/* Column 2: Navigation Links - Styled with Mid-Teal headers for a Pro look */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1">
            <div className="space-y-4">
              <h4 className="text-[#2B7574] font-black text-xs uppercase tracking-[0.2em]">Explore</h4>
              <ul className="space-y-3 text-[11px] md:text-xs font-bold uppercase tracking-widest">
                <li><Link href="/courses" className="text-[#E2E2E0]/80 hover:text-white transition-all">Courses</Link></li>
                <li><Link href="/ask" className="text-[#E2E2E0]/80 hover:text-white transition-all">Ask AI</Link></li>
                <li><Link href="/about" className="text-[#E2E2E0]/80 hover:text-white transition-all">About</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#2B7574] font-black text-xs uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-3 text-[11px] md:text-xs font-bold uppercase tracking-widest">
                <li><Link href="/careers" className="text-[#E2E2E0]/80 hover:text-white transition-all">Careers</Link></li>
                <li><Link href="/contact" className="text-[#E2E2E0]/80 hover:text-white transition-all">Contact</Link></li>
                <li><Link href="/privacy" className="text-[#E2E2E0]/80 hover:text-white transition-all">Privacy</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Connect - Aligned for a cleaner terminal flow */}
          <div className="space-y-6">
            <h4 className="text-[#2B7574] font-black text-xs uppercase tracking-[0.2em]">Connect</h4>
            <div className="flex gap-6 text-[#E2E2E0]/60">
               <Link href="https://linkedin.com/company/nexa-agent" target="_blank" className="hover:text-white transition-all hover:scale-110">
                 <Linkedin size={22} />
               </Link>
               <Link href="https://x.com/nexa_agent25" target="_blank" className="hover:text-white transition-all hover:scale-110">
                 <Twitter size={22} />
               </Link>
               <Link href="mailto:support@uaarn.com" className="hover:text-[#861211] transition-all hover:scale-110">
                 <Mail size={22} />
               </Link>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E2E2E0]/30 leading-loose">
              Based in Karachi, Sindh. <br />
              Global Reach.
            </p>
          </div>
        </div>

        {/* Bottom Bar: High-contrast technical metadata */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#E2E2E0]/20 font-black">
          <div>
            © {new Date().getFullYear()} UAARN Labs. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-[#E2E2E0]/60 transition-colors">Terms of Service</Link>
            <span className="opacity-10">|</span>
            <Link href="/privacy" className="hover:text-[#E2E2E0]/60 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}