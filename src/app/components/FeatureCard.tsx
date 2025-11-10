"use client";

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: string | LucideIcon;
}

export default function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  const isString = typeof icon === "string";
  const Icon = icon as LucideIcon;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-center mb-3 text-blue-600">
        {isString ? (
          <span className="text-4xl">{icon}</span>
        ) : (
          <Icon className="w-8 h-8" strokeWidth={1.8} />
        )}
      </div>

      <h4 className="text-lg font-semibold text-slate-800 mb-1">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
