"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, ExternalLink } from "lucide-react";

// --- Course Data remains exactly as provided ---
const courseData = {
  "graphics-design": {
    title: "Graphics Designing",
    platform: "Youtube",
    image: "https://static.vecteezy.com/system/resources/thumbnails/038/940/906/small_2x/ai-generated-graphic-design-workspace-with-colorful-illustration-photo.jpeg",
    link: "https://www.youtube.com/playlist?list=PLK1_9VA534IhRtQJYOtvN92Kb6T6vim7I",
    description: "Learn the fundamentals of modern graphic design — including color theory, composition, typography, and professional design tools.",
  },
  "python-for-beginners": {
    title: "Python for Beginners",
    platform: "Youtube",
    image: "https://cdn.sanity.io/images/f3hh12vm/production/4296312097ba5a7ac113abb6e2b68449362ab0c0-612x408.jpg",
    link: "https://youtu.be/UrsmFxEIp5k",
    description: "Master the basics of Python programming — from variables to loops — and start your coding journey with confidence.",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    platform: "Youtube",
    image: "https://media.istockphoto.com/id/1334591614/photo/man-using-digital-tablet-online-connect-to-internet-banking-currency-exchange-online-shopping.jpg?s=612x612&w=0&k=20&c=nejA5SuHcN2fAdO7Bkaf9pJrwzyLPBCyOLZgMaslGko=",
    link: "https://youtu.be/XuUbLHIRyuM",
    description: "Understand how to build, optimize, and grow digital marketing campaigns with SEO, content strategy, and social media marketing.",
  },
  "adobe-premiere-pro": {
    title: "Adobe Premiere Pro",
    platform: "Youtube",
    image: "https://cdn.sanity.io/images/f3hh12vm/production/f7fe9442715ea2c6c3159cca705ff2a1dc163f3a-1742x980.jpg",
    link: "https://www.coursera.org/projects/adobe-premiere-pro-for-beginners-quickstart-video-editing",
    description: "Learn how to edit, enhance, and produce professional-quality videos using Adobe Premiere Pro with advanced techniques in cutting, color grading, transitions, and audio design.",
  },
  "cyber-security": {
    title: "Cyber Security",
    platform: "Coursera",
    image: "https://cdn.sanity.io/images/f3hh12vm/production/264d1fb6ae09db2b726d8c4ebc65897e892e09b1-600x343.webp",
    link: "https://www.coursera.org/professional-certificates/google-cybersecurity",
    description: "Understand how to protect digital systems by learning ethical hacking, network defense, and cybersecurity fundamentals to detect, prevent, and respond to cyber threats."
  },
  "machine-learning": {
    title: "Machine Learning",
    platform: "Coursera",
    image: "https://cdn.sanity.io/images/f3hh12vm/production/bfbf6366f2ec41d68539900c776aad70057e9578-298x169.jpg",
    link: "https://www.coursera.org/learn/machine-learning-with-python",
    description: "Learn how to build, train, and deploy intelligent models using data-driven algorithms to solve real-world problems through predictive analytics and automation."
  },
  "openai-agents-sdk": {
    title: "OpenAI Agents SDK",
    platform: "Instagram",
    image: "https://cdn.sanity.io/images/f3hh12vm/production/ed98dc9dc43db97d05ea8604d6350a7190e22513-901x508.png",
    link: "https://www.instagram.com/p/DLqDACsMIHi/?igsh=ZTZmZjY4cWJ5NWU1",
    description: "Learn how to build, customize, and deploy intelligent AI agents using the OpenAI Agents SDK with tools integration, reasoning capabilities, and autonomous task execution."
  },
  "prompt-and-context-engineering": {
    title: "Prompt and Context Engineering",
    platform: "Instagram",
    image: "https://cdn.sanity.io/images/f3hh12vm/production/54b16b85ea4ecff224cd0d44e1f50360fa6e2513-823x487.png",
    link: "https://www.instagram.com/reel/DQTiG6wjPVF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    description: "Master the art of designing effective prompts and context strategies to optimize AI model responses, enhance reasoning, and achieve precise, goal-oriented outputs."
  }
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = Object.entries(courseData).find(
    ([key]) => key.toLowerCase() === (id as string).toLowerCase()
  )?.[1];

  if (!course) {
    return (
      <div className="min-h-screen bg-[#E2E2E0] flex items-center justify-center text-[#0E2931]/50">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Module Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E2E2E0] py-12 px-6 selection:bg-[#861211]/20">
      <div className="max-w-4xl mx-auto"> {/* Decreased from max-w-5xl for a sleeker profile */}
        
        {/* Navigation / Back Button */}
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-[#0E2931]/40 hover:text-[#861211] font-bold text-xs uppercase tracking-[0.2em] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Modules
        </Link>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#2B7574]/10 border border-[#0E2931]/5 overflow-hidden group">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Section */}
            <div className="lg:w-[45%] relative h-[280px] lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-[#0E2931]/5">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0E2931]/30 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-6 left-6 px-3 py-1.5 bg-white/90 backdrop-blur-md border border-[#0E2931]/10 rounded-full shadow-sm">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0E2931]">
                  {course.platform} Module
                </span>
              </div>
            </div>

            {/* Information Section */}
            <div className="lg:w-[55%] p-8 lg:p-12 flex flex-col relative">
               {/* Decorative Matrix Accent */}
               <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#0E2931]/5 group-hover:border-[#861211]/20 transition-all duration-500 rounded-tr-[2.5rem] -translate-x-6 translate-y-6" />

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#2B7574] animate-pulse" />
                   <span className="text-[9px] font-black uppercase text-[#0E2931]/40 tracking-widest">Active Intelligence Path</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-[#0E2931] uppercase tracking-tighter leading-tight mb-6">
                  {course.title}
                </h1>
                <p className="text-[#0E2931]/70 text-base leading-relaxed font-medium">
                  {course.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-wrap gap-4">
                <a
                  href={course.link}
                  target="_blank"
                  className="group/btn relative px-8 py-3.5 bg-[#0E2931] text-white text-[12px] font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-[#12484C] hover:scale-105 active:scale-95 shadow-lg shadow-[#0E2931]/20 flex items-center gap-2"
                >
                  Access Module <ExternalLink size={12} />
                </a>
                
                <Link
                  href={`/summarize?link=${encodeURIComponent(course.link)}`}
                  className="group/sum px-8 py-3.5 border-2 border-[#861211] text-[#861211] text-[12px] font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-[#861211] hover:text-white flex items-center gap-2"
                >
                  <Sparkles size={12} className="group-hover/sum:animate-spin" />
                  AI Summary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}