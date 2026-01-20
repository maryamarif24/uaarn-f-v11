"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "fc3dea13-38da-4a57-a917-372d7f3089d6",
          ...formData
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    /* Main Page Background: Bone White (#E2E2E0) */
    <div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center px-4 py-16 selection:bg-[#861211]/20">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/20 overflow-hidden border border-[#0E2931]/5">
        <div className="grid md:grid-cols-2">
          
          {/* 1st COLUMN: FULL LAYERED SIDEBAR */}
          <div className="relative bg-[#0E2931] text-[#E2E2E0] p-10 md:p-16 flex flex-col justify-center overflow-hidden min-h-[600px]">
            
            {/* Background Layering - Using Absolute Divs for Full Coverage */}
            {/* Layer 1: Medium Teal Wave */}
            <div 
              className="absolute inset-0 z-0 bg-[#12484C]" 
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
            />
            
            {/* Layer 2: Lighter Teal/Aqua Shape */}
            <div 
              className="absolute inset-0 z-0 bg-[#2B7574]" 
              style={{ clipPath: 'ellipse(90% 60% at 10% 40%)', opacity: 0.6 }}
            />

            {/* Layer 3: The Bone White "Sand" Line */}
            <div 
              className="absolute inset-0 z-0 bg-[#E2E2E0]" 
              style={{ clipPath: 'polygon(100% 30%, 60% 50%, 80% 80%, 100% 90%)', opacity: 0.15 }}
            />

            {/* Layer 4: The Bold Red "Alone" Island Shape */}
            <div 
              className="absolute bottom-0 right-0 w-[80%] h-[70%] z-0 bg-[#861211]" 
              style={{ clipPath: 'polygon(100% 20%, 40% 60%, 50% 100%, 100% 100%)', opacity: 0.9 }}
            />

            {/* Layer 5: Dark Overlay for Text Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0E2931]/80 via-transparent to-transparent" />

            {/* CONTENT START (Wrapped in z-10 to stay above shapes) */}
            <div className="relative z-10">
                <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">
  Get in <br/> 
  <span className="text-[#861211] drop-shadow-[3px_3px_3px_rgba(255,255,255,0.5)]">
    Touch
  </span>
</h2>
                
                <p className="text-[#E2E2E0]/80 mb-12 text-lg leading-relaxed max-w-md font-medium">
                  Have questions about our AI resilience network? Our team is ready to provide the clarity you need.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#E2E2E0]/10 border border-[#E2E2E0]/20 group-hover:border-[#861211] transition-all duration-300 backdrop-blur-sm">
                      <span className="text-xl">📧</span>
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">support@uaarn.com</span>
                  </div>

                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#E2E2E0]/10 border border-[#E2E2E0]/20 group-hover:border-[#861211] transition-all duration-300 backdrop-blur-sm">
                      <span className="text-xl">🌐</span>
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">www.uaarn.com</span>
                  </div>

                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#E2E2E0]/10 border border-[#E2E2E0]/20 group-hover:border-[#861211] transition-all duration-300 backdrop-blur-sm">
                      <span className="text-xl">📍</span>
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">Karachi, Pakistan</span>
                  </div>
                </div>
            </div>
          </div>

          {/* 2nd COLUMN: FORM */}
          <div className="p-10 md:p-16 bg-white flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-xs font-black text-[#0E2931] uppercase tracking-[0.3em] whitespace-nowrap">
                Send Message
              </h3>
              <div className="h-px w-full bg-[#0E2931]/10" />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME"
                  className="w-full p-5 bg-[#F4F4F3] border border-transparent rounded-2xl focus:bg-white focus:border-[#861211]/30 outline-none transition-all text-xs font-bold tracking-widest text-[#0E2931] placeholder-[#0E2931]/40"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL"
                  className="w-full p-5 bg-[#F4F4F3] border border-transparent rounded-2xl focus:bg-white focus:border-[#861211]/30 outline-none transition-all text-xs font-bold tracking-widest text-[#0E2931] placeholder-[#0E2931]/40"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  rows={4}
                  className="w-full p-5 bg-[#F4F4F3] border border-transparent rounded-2xl focus:bg-white focus:border-[#861211]/30 outline-none transition-all text-xs font-bold tracking-widest text-[#0E2931] placeholder-[#0E2931]/40 resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-[#861211] overflow-hidden text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all hover:shadow-2xl hover:shadow-[#861211]/40 active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Transmitting..." : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </form>

            {success && (
              <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-fade-in">
                <span className="text-base">✓</span> Transmission Successful
              </div>
            )}
            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-fade-in">
                <span className="text-base">!</span> {error}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-6 text-[9px] font-bold uppercase tracking-[0.5em] text-[#0E2931]/40">
        UAARN External Communications • Secure Channel
      </div>
    </div>
  );
}