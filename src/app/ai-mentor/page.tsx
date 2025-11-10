'use client'
import { useState, useRef, useEffect } from 'react'
import ChatBubble from '../components/ChatBubble'
import ChatInput from '../components/ChatInput'
import LoadingDots from '../components/LoadingDots'
import CareerSection from '../components/CareerSection'

// --- Interface Definition (Kept as is) ---
interface Message {
  text: string
  isUser: boolean
}
// ----------------------------------------

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: `Hello! I'm your **AI Career Mentor**. 
      
I can help you with: 
* Choose the right career path
* Build a 90-day skill roadmap
* Rewrite your CV & Cover Letter
* Prepare for tough interviews
* Strategies for starting freelancing

Just type your question below or upload your CV to get started!`, 
      isUser: false 
    }
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    // Scroll logic remains the same
    const container = messagesEndRef.current?.parentElement;
    if (container && (container.scrollHeight - container.scrollTop < container.offsetHeight + 300)) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // --- API Handlers (Kept as is) ---
  const formatResponse = (text: string) => {
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(\* |• )/g, '<li>') // Added basic list formatting for welcome message
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, isUser: true }])
    setLoading(true)

    try {
      const res = await fetch('/careerapi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })

      if (!res.ok) throw new Error('Failed to get a response from the AI.')

      const data = await res.json()
      const reply = formatResponse(data.reply)
      setMessages(prev => [...prev, { text: reply, isUser: false }])
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "⚠️ **Connection Error:** Sorry, I'm having trouble connecting right now. Please check your network or try again.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setMessages(prev => [...prev, { text: `CV Uploaded: ${file.name}. Analyzing your profile now...`, isUser: true }])
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/careerapi/upload-cv', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error('CV Upload failed.')

      const data = await res.json()
      const analysis = formatResponse(data.analysis)
      setMessages(prev => [...prev, { text: analysis, isUser: false }])
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "❌ **Analysis Failed:** Could not analyze your CV file. Please try uploading a PDF or copy-paste the text content into the chat.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  // --- Component Structure (Enhanced UI) ---
  return (
    // Outer container to match the site's overall look
    <div className="bg-slate-50 min-h-screen"> 
      {/* Career Section header remains */}
      <CareerSection /> 
      
      {/* Centered Chat Container */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-20">
        
        {/* Main Chat Box: Clean shadow, slightly rounded, and defined size */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Chat History Area (Scrollable) */}
          <div className="h-[75vh] max-h-[800px] overflow-y-auto p-6 md:p-8">
            {messages.map((msg, i) => (
              // FIX: Pass the formatted text directly to dangerouslySetInnerHTML
              <ChatBubble 
                key={i} 
                isUser={msg.isUser} 
                dangerouslySetInnerHTML={{ __html: msg.text }} 
              />
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <ChatBubble isUser={false}>
                  <LoadingDots />
              </ChatBubble>
            )}
            
            {/* Scroll Anchor */}
            <div ref={messagesEndRef} className="pt-2" />
          </div>

          {/* Chat Input Area (Bottom docked) */}
          <div className="border-t border-slate-200">
            <ChatInput 
              onSend={sendMessage} 
              onFileUpload={handleFileUpload}
              disabled={loading} 
            />
          </div>
          
        </div>
      </div>
    </div>
  )
}