"use client";

import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { client } from "@/sanity/lib/client";

interface Course {
  _id: string;
  title: string;
  platform: string;
  image: string;
  link: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "course"]{
            _id,
            title,
            platform,
            "image": image.asset->url,
            link
          } | order(_createdAt desc)
        `);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    /* Background: Soft Bone White (#E2E2E0) - Matched to Home Page */
    <div className="min-h-screen bg-[#E2E2E0] py-20 px-8 selection:bg-[#861211]/20">
      
      {/* Centered Heading Container */}
      <div className="max-w-6xl mx-auto text-center mb-16 flex flex-col items-center">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-[#0E2931] uppercase tracking-tighter">
            Explore <span className="text-[#861211]">Top Courses</span>
          </h2>
          <p className="text-[#0E2931]/60 mt-4 text-lg font-medium italic">
            Learn from world-class platforms like Coursera — and let AI summarize
            your lessons in seconds.
          </p>
        </div>
        
        {/* Centered Decorative Divider */}
        <div className="mt-8 h-[2px] w-24 bg-[#0E2931]/10"></div>
      </div>

      {loading ? (
        <p className="text-center text-[#0E2931]/50 font-medium animate-pulse">
          Synchronizing courses...
        </p>
      ) : courses.length === 0 ? (
        <p className="text-center text-[#0E2931]/50 font-medium">
          No courses added yet. Please check back soon.
        </p>
      ) : (
        /* Responsive Grid */
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {courses.map((course) => (
            /* Note: Ensure CourseCard uses high-fidelity styling to match */
            <CourseCard
              key={course._id}
              title={course.title}
              platform={course.platform}
              image={course.image}
              link={course.link}
            />
          ))}
        </div>
      )}

      {/* Subtle Bottom Branding matching Home Page */}
      <div className="mt-20 flex justify-center opacity-20">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0E2931]">
          UAARN Educational Resilience Network
        </div>
      </div>
    </div>
  );
}