"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { Menu, X } from "lucide-react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import UpgradeButton from "./upgradeButton";

// Update the function signature to accept onOpenPlans
export default function Navbar({ onOpenPlans }: { onOpenPlans: () => void }) {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-[#E2E2E0] border-b border-[#0E2931]/10 sticky top-0 z-50 backdrop-blur-md">
      
      {/* LOGO SECTION */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-36 h-12 overflow-hidden rounded-xl p-1.5 transition-all">
            <Image 
              src="/logo.png" 
              alt="UAARN Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden lg:flex items-center space-x-10 text-[#0E2931] text-[13px] font-black uppercase tracking-[0.1em]">
        <Link href="/" className="hover:text-[#861211] transition-all duration-300">Home</Link>
        <Link href="/about" className="hover:text-[#861211] transition-all duration-300">About</Link>
        <Link href="/courses" className="hover:text-[#861211] transition-all duration-300">Courses</Link>
        <Link href="/ask" className="hover:text-[#861211]">Ask AI</Link>
        <Link href="/contact" className="hover:text-[#861211] transition-all duration-300">Contact</Link>
        <Link href="/role-selection" className="bg-[#0E2931] text-white px-5 py-2.5 rounded-full hover:bg-[#12484C] transition-all shadow-md">Dashboard</Link>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block scale-95">
            {/* Pass onOpenPlans to UpgradeButton */}
            <UpgradeButton onClickAction={onOpenPlans} />
        </div>

        <div className="flex items-center">
          {isSignedIn ? (
            <div className="border-2 border-[#861211]/20 rounded-full p-0.5 hover:border-[#861211] transition-all">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-[#861211] hover:bg-[#6a0e0d] text-white px-7 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-[#861211]/20 active:scale-95">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden text-[#0E2931] p-1 hover:bg-[#0E2931]/5 rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#E2E2E0] border-t border-[#0E2931]/10 shadow-2xl flex flex-col items-center py-12 space-y-8 text-[#0E2931] lg:hidden animate-in fade-in slide-in-from-top-5 duration-300">
          <Link href="/" className="text-lg font-black uppercase tracking-[0.2em] hover:text-[#861211]" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" className="text-lg font-black uppercase tracking-[0.2em] hover:text-[#861211]" onClick={() => setOpen(false)}>About</Link>
          <Link href="/courses" className="text-lg font-black uppercase tracking-[0.2em] hover:text-[#861211]" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="/ask" className="text-lg font-black uppercase tracking-[0.2em] text-[#2B7574]" onClick={() => setOpen(false)}>Ask AI</Link>
          <Link href="/contact" className="text-lg font-black uppercase tracking-[0.2em] hover:text-[#861211]" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/role-selection" className="text-lg font-black uppercase tracking-[0.2em] hover:text-[#861211]" onClick={() => setOpen(false)}>Dashboard</Link>

          <div className="pt-6 flex flex-col items-center gap-6 w-full px-10">
            <div className="w-full h-px bg-[#0E2931]/10" />
            {/* Pass onOpenPlans to UpgradeButton in Mobile View */}
            <UpgradeButton onClickAction={onOpenPlans} />
            {!isSignedIn && (
                <SignInButton mode="modal">
                    <button className="w-full bg-[#0E2931] text-white py-5 rounded-full font-black text-sm uppercase tracking-[0.2em]">
                        Initialize Session
                    </button>
                </SignInButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}