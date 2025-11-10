'use client'
import Link from 'next/link'
import { Rocket, GraduationCap, Briefcase } from 'lucide-react'

// Array for Feature Cards with updated icons
const careerFeatures = [
    { 
        title: "Personalized Roadmaps", 
        desc: "AI identifies skill gaps and builds a step-by-step 90-day learning plan just for you.",
        icon: GraduationCap // Lucide Icon
    },
    { 
        title: "CV & Interview Coaching", 
        desc: "Get AI-powered rewriting, mock interviews, and tailored feedback to land your dream role.",
        icon: Briefcase // Lucide Icon
    },
    { 
        title: "Career Discovery Engine", 
        desc: "Explore high-demand career paths and find the one that perfectly aligns with your interests.",
        icon: Rocket // Lucide Icon
    }
];

export default function CareerSection() {
    return (
        // Section background uses a slight gradient and border for separation
        <section className="py-20 px-8 bg-slate-50 border-t border-slate-200">
            <div className="max-w-6xl mx-auto text-center">
                
                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight max-w-3xl mx-auto">
                    Your <span className="text-blue-600">AI-Powered</span> Career Mentor
                </h2>
                
                {/* Sub-text */}
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    Unlock personalized career advice, skill roadmaps, CV rewriting, interview prep, and freelancing tips — all tailored by AI.
                </p>

                {/* Call-to-Action Button */}
                <div className="mt-10">
                    <Link 
                        href="/ai-mentor" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl text-lg"
                    >
                        Start Your Free Session
                    </Link>
                </div>

                {/* Feature Cards Grid */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {careerFeatures.map((item) => (
                        <div 
                            key={item.title} 
                            // Card styling matches the clean, light theme
                            className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition duration-300 text-left"
                        >
                            {/* Icon in blue circle for visual emphasis */}
                            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
                                <item.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                            <p className="mt-2 text-slate-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}