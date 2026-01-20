'use client'
import { useState, useRef, useEffect } from 'react'
import ChatBubble from '../components/ChatBubble'
import ChatInput from '../components/ChatInput'
import LoadingDots from '../components/LoadingDots'
import CareerSection from '../components/CareerSection'

interface Message {
  text: string
  isUser: boolean
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: `Hello! I'm your "AI Career Mentor". <br/>
      I can help you with:<br/>
      🗺️ Choose the right career path<br/>
      🗓️ Build a 90-day skill roadmap<br/>
      📄 Rewrite your CV & Cover Letter<br/>
      🎤 Prepare for tough interviews<br/>
      🚀 Strategies for starting freelancing<br/>
      Just type your question below or upload your CV to get started!`, 
      isUser: false 
    }
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    const container = messagesEndRef.current?.parentElement;
    if (container) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatResponse = (text: string) => {
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(\* |• )/g, '<li>') 
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, isUser: true }])
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND_URL}/careerapi/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })

      if (!res.ok) throw new Error('Failed to get a response.')

      const data = await res.json()
      const reply = formatResponse(data.reply)
      setMessages(prev => [...prev, { text: reply, isUser: false }])
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "⚠️ **Connection Error:** Sorry, I'm having trouble connecting right now.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setMessages(prev => [...prev, { text: `CV Uploaded: ${file.name}. Analyzing...`, isUser: true }])
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`${BACKEND_URL}/careerapi/upload-cv`, {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error('CV Upload failed.')

      const data = await res.json()
      const analysis = formatResponse(data.analysis)
      setMessages(prev => [...prev, { text: analysis, isUser: false }])
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "❌ **Analysis Failed:** Could not analyze your CV.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  return (
    /* Background: Soft Bone (#E2E2E0) from your palette reference */
    <div className="bg-[#E2E2E0] min-h-screen font-sans selection:bg-[#861211]/20"> 
      <CareerSection /> 
      
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-24">
        
        {/* Main Chat Box: Pro Matrix Style using Deep Teal (#0E2931) for borders */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-[#0E2931]/10 overflow-hidden border border-[#0E2931]/5 relative group transition-all duration-500">
          
          {/* Decorative Corner Accent matching your feature cards */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#0E2931]/10 group-hover:border-[#861211]/30 transition-all duration-500 rounded-tr-[2.5rem]" />

          {/* Chat History Area */}
          <div className="h-[70vh] max-h-[750px] overflow-y-auto p-8 md:p-12 space-y-8">
            {messages.map((msg, i) => (
              <ChatBubble 
                key={i} 
                isUser={msg.isUser} 
                dangerouslySetInnerHTML={{ __html: msg.text }} 
                /* Note: Ensure your ChatBubble component handles:
                   isUser ? bg-[#861211] text-white : bg-[#0E2931]/5 text-[#0E2931]
                */
              />
            ))}
            
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-[#0E2931]/5 px-6 py-4 rounded-2xl">
                    <LoadingDots />
                 </div>
              </div>
            )}
            
            <div ref={messagesEndRef} className="pt-4" />
          </div>

          {/* Chat Input Area: Anchored at bottom with Soft Bone background */}
          <div className="bg-[#E2E2E0]/30 backdrop-blur-md border-t border-[#0E2931]/5 p-6">
            <ChatInput 
              onSend={sendMessage} 
              onFileUpload={handleFileUpload}
              disabled={loading} 
              /* Note: Ensure ChatInput button uses bg-[#861211] (Crimson) 
                 and text-[#E2E2E0] (Bone)
              */
            />
          </div>
          
        </div>

        {/* Footer info in Deep Teal (#0E2931) */}
        <p className="text-center mt-8 text-[10px] uppercase tracking-[0.3em] font-bold text-[#0E2931]/40">
           Engineered Resilience Module • Secure Session
        </p>
      </div>
    </div>
  )
}