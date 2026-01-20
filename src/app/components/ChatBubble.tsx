import React from 'react';

// The ChatBubble component needs to accept either children (for standard text/LoadingDots)
// OR dangerouslySetInnerHTML (for formatted HTML text)
interface ChatBubbleProps {
  children?: React.ReactNode;
  isUser: boolean;
  dangerouslySetInnerHTML?: { __html: string };
}

export default function ChatBubble({ children, isUser, dangerouslySetInnerHTML }: ChatBubbleProps) {
  const bubbleClasses = isUser
    ? "bg-[#861211] text-white rounded-tr-sm self-end shadow-lg shadow-[#861211]/20" 
    : "bg-white border border-[#0E2931]/5 text-[#0E2931] rounded-tl-sm self-start shadow-sm";

  return (
    <div className={`flex w-full mt-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] md:max-w-[75%] p-5 text-sm rounded-[1.5rem] leading-relaxed font-medium ${bubbleClasses}`}>
        {dangerouslySetInnerHTML ? (
          <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        ) : (
          children
        )}
      </div>
    </div>
  );
}