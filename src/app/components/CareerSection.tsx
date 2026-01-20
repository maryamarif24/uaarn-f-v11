'use client'
import Link from 'next/link'
import { Rocket, GraduationCap, Briefcase } from 'lucide-react'

const careerFeatures = [
    { 
        title: "Personalized Roadmaps", 
        desc: "AI identifies skill gaps and builds a step-by-step 90-day learning plan just for you.",
        icon: GraduationCap 
    },
    { 
        title: "CV & Interview Coaching", 
        desc: "Get AI-powered rewriting, mock interviews, and tailored feedback to land your dream role.",
        icon: Briefcase 
    },
    { 
        title: "Career Discovery Engine", 
        desc: "Explore high-demand career paths and find the one that perfectly aligns with your interests.",
        icon: Rocket 
    }
];

export default function CareerSection() {
    return (
        /* Section background: Bone White (#E2E2E0) */
        <section className="py-20 px-8 bg-[#E2E2E0] border-t border-[#0E2931]/10">
            <div className="max-w-6xl mx-auto text-center">
                
                {/* Main Heading: Deep Teal (#0E2931) */}
                <h2 className="text-3xl sm:text-4xl font-black text-[#0E2931] tracking-tighter uppercase leading-tight max-w-3xl mx-auto">
                    Your <span className="text-[#861211]">AI-Powered</span> Career Mentor
                </h2>
                
                {/* Sub-text */}
                <p className="mt-4 text-lg text-[#0E2931]/70 max-w-3xl mx-auto font-medium">
                    Unlock personalized career advice, skill roadmaps, CV rewriting, interview prep, and freelancing tips — all tailored by AI.
                </p>

                {/* Call-to-Action: Crimson (#861211) */}
                <div className="mt-10">
                    <Link 
                        href="/ai-mentor" 
                        className="inline-block bg-[#861211] hover:bg-[#6a0e0d] text-white font-bold px-8 py-3 rounded-full transition duration-300 shadow-lg shadow-[#861211]/20 text-sm uppercase tracking-widest"
                    >
                        Start Your Free Session
                    </Link>
                </div>

                {/* Feature Cards Grid */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {careerFeatures.map((item) => (
                        <div 
                            key={item.title} 
                            /* Cards use white background with Bone White borders */
                            className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#0E2931]/5 shadow-sm hover:shadow-md transition duration-300 text-left"
                        >
                            {/* Icon in Teal-tinted circle */}
                            <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-[#2B7574]/10">
                                <item.icon className="w-6 h-6 text-[#2B7574]" />
                            </div>
                            
                            <h3 className="text-xl font-black text-[#0E2931] uppercase tracking-tighter">{item.title}</h3>
                            <p className="mt-2 text-[#0E2931]/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}