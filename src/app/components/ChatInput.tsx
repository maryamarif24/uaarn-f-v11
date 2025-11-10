'use client'
import { useState } from 'react'
import { FiSend, FiPaperclip } from 'react-icons/fi'

interface ChatInputProps {
  onSend: (text: string) => Promise<void>
  onFileUpload: (file: File) => Promise<void>
  disabled: boolean
}

export default function ChatInput({ onSend, onFileUpload, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || disabled) return
    await onSend(input.trim())
    setInput('')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
      // Reset the input value so the same file can be selected again
      e.target.value = '' 
    }
  }

  return (
    // Updated padding and background to match the chat container border area
    <form onSubmit={handleSubmit} className="p-4 bg-slate-50"> 
      <div className="flex gap-3 max-w-4xl mx-auto items-center">
        
        {/* File Upload Button (Paperclip) */}
        <label 
            className={`cursor-pointer flex-shrink-0 p-2 rounded-full ${disabled ? 'opacity-50' : 'hover:bg-slate-100 transition'}`}
        >
          <FiPaperclip className="w-6 h-6 text-slate-500 hover:text-blue-600 transition" />
          <input
            type="file"
            // Ensure appropriate file types for CV/documents
            accept=".pdf,.doc,.docx,.txt" 
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
          />
        </label>

        {/* Text Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about career, CV, freelancing, roadmap..."
          // Updated styling for theme consistency
          className="flex-1 px-5 py-3 border border-slate-300 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={disabled}
        />

        {/* Send Button (Color Correction Applied) */}
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          // CORRECTED: Using blue-600 for the primary button color
          className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition duration-150 shadow-md"
        >
          <FiSend size={18} />
          <span className="hidden sm:inline font-medium">Send</span>
        </button>
      </div>
    </form>
  )
}