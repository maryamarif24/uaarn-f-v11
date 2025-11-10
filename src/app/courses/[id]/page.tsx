"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


const courseData = {
  "graphics-design": {
    title: "Graphics Designing",
    platform: "Youtube",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/038/940/906/small_2x/ai-generated-graphic-design-workspace-with-colorful-illustration-photo.jpeg",
    link: "https://www.youtube.com/playlist?list=PLK1_9VA534IhRtQJYOtvN92Kb6T6vim7I",
    description:
      "Learn the fundamentals of modern graphic design — including color theory, composition, typography, and professional design tools.",
  },
  "python-for-beginners": {
    title: "Python for Beginners",
    platform: "Youtube",
    image: "https://cdn.sanity.io/images/f3hh12vm/production/4296312097ba5a7ac113abb6e2b68449362ab0c0-612x408.jpg",
    link: "https://youtu.be/UrsmFxEIp5k",
    description:
      "Master the basics of Python programming — from variables to loops — and start your coding journey with confidence.",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    platform: "Youtube",
    image:
      "https://media.istockphoto.com/id/1334591614/photo/man-using-digital-tablet-online-connect-to-internet-banking-currency-exchange-online-shopping.jpg?s=612x612&w=0&k=20&c=nejA5SuHcN2fAdO7Bkaf9pJrwzyLPBCyOLZgMaslGko=",
    link: "https://youtu.be/XuUbLHIRyuM",
    description:
      "Understand how to build, optimize, and grow digital marketing campaigns with SEO, content strategy, and social media marketing.",
  },
  "adobe-premiere-pro": {
    title: "Adobe Premiere Pro",
    platform: "Youtube",
    image:
      "https://cdn.sanity.io/images/f3hh12vm/production/f7fe9442715ea2c6c3159cca705ff2a1dc163f3a-1742x980.jpg",
    link: "https://www.coursera.org/projects/adobe-premiere-pro-for-beginners-quickstart-video-editing",
    description:
      "Learn how to edit, enhance, and produce professional-quality videos using Adobe Premiere Pro with advanced techniques in cutting, color grading, transitions, and audio design.",
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
  const course =
  Object.entries(courseData).find(
    ([key]) => key.toLowerCase() === (id as string).toLowerCase()
  )?.[1];

  if (!course) {
    return (
      <div className="text-center py-20 text-slate-600">
        <h2 className="text-2xl font-semibold">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-20 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
          unoptimized
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{course.title}</h1>
          <p className="text-slate-500 mb-4">{course.platform}</p>
          <p className="text-slate-600 mb-8 leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={course.link}
              target="_blank"
              className="bg-blue-100 text-blue-700 px-5 py-2 rounded-lg hover:bg-blue-200 transition"
            >
              View Course
            </a>
            <Link
              href={`/summarize?link=${encodeURIComponent(course.link)}`}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Summarize
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
