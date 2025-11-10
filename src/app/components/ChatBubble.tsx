import React from 'react';

// The ChatBubble component needs to accept either children (for standard text/LoadingDots)
// OR dangerouslySetInnerHTML (for formatted HTML text)
interface ChatBubbleProps {
  children?: React.ReactNode;
  isUser: boolean;
  dangerouslySetInnerHTML?: { __html: string };
}

export default function ChatBubble({ children, isUser, dangerouslySetInnerHTML }: ChatBubbleProps) {
  
  // 1. Conditional CSS Classes based on isUser prop
  const bubbleClasses = isUser
    ? "bg-blue-600 text-white rounded-tr-sm self-end" // User: Blue, right-aligned
    : "bg-slate-100 text-slate-800 rounded-tl-sm self-start"; // AI: Light neutral, left-aligned

  const layoutClasses = isUser
    ? "justify-end" // Aligns message container to the right
    : "justify-start"; // Aligns message container to the left

  return (
    <div className={`flex w-full mt-4 ${layoutClasses}`}>
      <div 
        className={`max-w-[80%] md:max-w-[70%] p-4 text-sm rounded-xl shadow-sm transition duration-150 ${bubbleClasses}`}
      >
        {/* 2. Rendering Content */}
        {dangerouslySetInnerHTML ? (
          // If formatted HTML is provided, render it using dangerouslySetInnerHTML
          <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        ) : (
          // Otherwise, render regular children (e.g., LoadingDots component)
          children
        )}
      </div>
    </div>
  );
}