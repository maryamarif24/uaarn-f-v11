"use client";
import { FiSend, FiPaperclip } from 'react-icons/fi';
import { useState } from 'react'; // Standard React hook

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  onFileUpload: (file: File) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, onFileUpload, disabled }: ChatInputProps) {
  // FIXED: Changed useLocalState to useState
  const [input, setInput] = useState(''); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    await onSend(input.trim());
    setInput(''); // Clears input after successful transmission
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      e.target.value = ''; // Reset to allow re-uploading same file
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-4 items-center">
      {/* File Upload: Mid-Teal accent with Bone White background */}
      <label className={`cursor-pointer p-3 rounded-xl bg-[#E2E2E0]/30 ${disabled ? 'opacity-30' : 'hover:bg-[#E2E2E0]/60 transition'}`}>
        <FiPaperclip className="w-5 h-5 text-[#0E2931]/40" />
        <input 
          type="file" 
          className="hidden" 
          disabled={disabled} 
          onChange={handleFileChange} 
          accept=".pdf,.doc,.docx,.txt"
        />
      </label>

      {/* Main Input: Bone White theme with Deep Teal text */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Query the Resilience Network..."
        className="flex-1 px-6 py-4 bg-[#E2E2E0]/20 border border-[#0E2931]/5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#861211]/20 focus:bg-white text-[#0E2931] font-medium transition-all"
        disabled={disabled}
      />

      {/* Send Button: Crimson accent matching UAARN palette */}
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="p-4 bg-[#861211] text-white rounded-full hover:bg-[#6a0e0d] disabled:opacity-30 transition-all shadow-xl shadow-[#861211]/20 active:scale-95"
      >
        <FiSend size={20} />
      </button>
    </form>
  );
}