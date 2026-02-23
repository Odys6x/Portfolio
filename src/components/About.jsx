import { motion } from 'framer-motion'
import { useState } from 'react'

const funFacts = [
  { emoji: '🎮', text: 'Mobile Legends & Valorant grinder' },
  { emoji: '🍳', text: 'Cooks for the family' },
  { emoji: '🚶', text: 'Daily 10km walks/jogs' },
  { emoji: '🐠', text: 'Aquarium & shrimp tank keeper' },
  { emoji: '🇫🇷', text: 'Grew up in France for 9 years' },
]

const SYSTEM_PROMPT = `You are Owen, a final year Applied AI student at Singapore Institute of Technology (SIT). You are friendly, casual, and use Singlish occasionally. Here's what you know about yourself:

- Doing internship at SP Group's Cyber Defense Operations Center (CDOC) building an AI-powered incident response system
- Won 2nd place at Hackrift 2025 with PathFinders - an AI school recommendation system
- Skills: Python, React, LLMs, RAG, fine-tuning, cybersecurity
- Hobbies: gaming (Mobile Legends, Valorant), cooking for family, daily 10km walks, shrimp tank
- Grew up in France for 9 years
- Graduating April 2026
- Looking for AI/tech roles at companies like GovTech

Answer questions about yourself in first person, keep it short and conversational. If you don't know something, say so naturally.`

async function askOwen(question, history) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: question }
  ]

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  const data = await response.json()
  return data.reply || 'Eh something went wrong leh 😅'
}

function About() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I\'m Owen 👋 Ask me anything about myself!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await askOwen(input, messages)
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (e) {
    console.log('Error:', e)
    setMessages([...newMessages, { role: 'assistant', content: 'Walao something went wrong leh 😅' }])
    }finally {
      setLoading(false)
    }
  }

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pl-24 py-24 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2] to-[#e8f4f8] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#b8e0f7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#ffb7c5]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[#7bc4c4] text-xs tracking-[0.4em] mb-3"
        >
          私について — about me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold text-[#2d5a6b] mb-6 tracking-tight"
        >
          Who am I?
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-[#7bc4c4]/60 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#5a6a72] text-lg leading-relaxed mb-4"
        >
          Hey! I'm Owen — a final year Applied AI student at SIT, currently
          doing my internship at SP Group's Cyber Defense Operations Center
          building an AI-powered incident response system.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[#5a6a72] text-lg leading-relaxed mb-8"
        >
          I love building things that actually work in the real world — from
          fine-tuning LLMs to winning hackathons. When I'm not coding,
          I'm probably gaming, cooking, or watching my shrimp tank.
        </motion.p>

        {/* Fun facts */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#7bc4c4] text-xs tracking-[0.4em] mb-4"
        >
          たのしみ — fun facts
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#7bc4c4]/30 bg-white/60 backdrop-blur-sm text-[#2d5a6b] text-sm"
            >
              <span>{fact.emoji}</span>
              <span>{fact.text}</span>
            </motion.div>
          ))}
        </div>

        {/* AI Chat */}
        {/* AI Chat */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.8 }}
>
  <p className="text-[#7bc4c4] text-xs tracking-[0.4em] mb-4">
    チャット — chat with me
  </p>

  <div className="rounded-2xl overflow-hidden shadow-lg"
    style={{ border: '1px solid rgba(123,196,196,0.25)', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)' }}>
    
    {/* Chat header */}
    <div className="px-5 py-4 flex items-center gap-3"
      style={{ background: 'linear-gradient(135deg, rgba(45,90,107,0.08), rgba(123,196,196,0.12))', borderBottom: '1px solid rgba(123,196,196,0.15)' }}>
      <div className="relative">
        <div className="w-9 h-9 rounded-full bg-[#2d5a6b] flex items-center justify-center text-white text-sm font-bold">O</div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
      </div>
      <div className="text-left">
        <p className="text-[#2d5a6b] text-sm font-semibold">Owen</p>
        <p className="text-[#7bc4c4] text-xs">AI-powered · usually responds instantly</p>
      </div>
    </div>

    {/* Messages */}

    <div className="px-5 py-5 flex flex-col gap-4 h-56 overflow-y-auto"
    style={{ background: 'rgba(248,252,255,0.6)' }}>
      {messages.map((msg, i) => (
        <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'assistant' && (
            <div className="w-7 h-7 rounded-full bg-[#2d5a6b] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">O</div>
          )}
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm max-w-xs text-left leading-relaxed ${
              msg.role === 'user'
                ? 'text-white rounded-tr-sm'
                : 'text-[#3d3530] rounded-tl-sm'
            }`}
            style={{
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #2d5a6b, #3a7a8a)'
                : 'rgba(255,255,255,0.9)',
              border: msg.role === 'assistant' ? '1px solid rgba(123,196,196,0.2)' : 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex gap-2 justify-start">
          <div className="w-7 h-7 rounded-full bg-[#2d5a6b] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">O</div>
          <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/90 border border-[#7bc4c4]/20 flex gap-1 items-center"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-[#7bc4c4]" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-[#7bc4c4]" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-[#7bc4c4]" />
          </div>
        </div>
      )}
    </div>

    {/* Input */}
    <div className="px-4 py-3 flex gap-2 items-center"
      style={{ borderTop: '1px solid rgba(123,196,196,0.15)', background: 'rgba(255,255,255,0.7)' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Ask me anything..."
        className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none text-[#3d3530] placeholder-[#bbb]"
        style={{ background: 'rgba(240,248,252,0.8)', border: '1px solid rgba(123,196,196,0.25)' }}
      />
      <motion.button
        onClick={handleSend}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg, #2d5a6b, #3a7a8a)' }}
      >
        →
      </motion.button>
    </div>

  </div>
</motion.div>

      </div>
    </section>
  )
}

export default About