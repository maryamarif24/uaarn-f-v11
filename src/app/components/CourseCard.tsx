"use client";
import Image from "next/image";
import Link from "next/link";

interface SanityImage {
  asset?: {
    _ref?: string;
  };
}

interface CourseCardProps {
  title: string;
  platform: string;
  image?: string | SanityImage | null;
  link: string;
}

export default function CourseCard({ title, platform, image }: CourseCardProps) {
  let imageUrl = "/placeholder.png";

  if (typeof image === "string") {
    imageUrl = image;
  } else if (image?.asset?._ref) {
    const projectId = "f3hh12vm"; 
    const ref = image.asset._ref.replace("image-", "").replace("-jpg", ".jpg");
    imageUrl = `https://cdn.sanity.io/images/${projectId}/production/${ref}`;
  }

  return (
    <div className="group relative bg-white border border-[#0E2931]/5 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-[#2B7574]/10 flex flex-col h-full overflow-hidden">
      
      {/* Image Section with Branded Overlay */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2931]/40 to-transparent opacity-60" />
        
        {/* Platform Badge - Matrix Style */}
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#E2E2E0]/90 backdrop-blur-md border border-[#0E2931]/10 rounded-full shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0E2931]">
            {platform}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10 flex flex-col flex-grow relative">
        {/* Decorative Corner Accent */}
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#0E2931]/5 group-hover:border-[#861211]/30 transition-all duration-500 rounded-tr-[2.5rem] -translate-x-4 translate-y-4" />

        <h3 className="text-2xl font-black text-[#0E2931] uppercase tracking-tighter leading-none mb-6 group-hover:text-[#861211] transition-colors duration-300">
          {title}
        </h3>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#0E2931]/5">
          <Link
            href={`/courses/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`}
            className="flex items-center gap-3 text-[#861211] font-black text-xs uppercase tracking-[0.2em] group/link"
          >
            Module Details 
            <span className="transition-transform duration-300 group-hover/link:translate-x-2">→</span>
          </Link>

          {/* Status Indicator matching Features Section */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2B7574]/40 group-hover:bg-[#861211] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#0E2931]/30">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}