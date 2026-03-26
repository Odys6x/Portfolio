import { createClient } from 'redis'

async function getTrends() {
  if (!process.env.REDIS_URL) return []
  const client = createClient({ url: process.env.REDIS_URL })
  await client.connect()
  try {
    const val = await client.get('ai_trends')
    return val ? JSON.parse(val) : []
  } catch { return [] }
  finally { await client.disconnect() }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { messages } = req.body
  const trends = await getTrends()

  const storiesContext = trends.slice(0, 20).map((t, i) =>
    `${i + 1}. [${t.tag}] "${t.title}" — ${t.domain} (↑${t.score})${t.summary ? ` · ${t.summary}` : ''}`
  ).join('\n')

  const systemPrompt = `You are a sharp, concise tech news analyst embedded in Owen's portfolio. You have access to today's top AI and tech stories from HackerNews.

Today's stories:
${storiesContext || 'No stories loaded yet.'}

Guidelines:
- Be conversational, insightful, and direct — no fluff
- Keep responses to 3–5 sentences unless asked for more detail
- When referencing a story, mention the source (e.g. "over on github.blog...")
- Highlight what's actually significant, not just what's popular
- If asked about something not in the stories, say so honestly`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 320,
        temperature: 0.65,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
      }),
    })
    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'Could not load briefing right now.'
    res.status(200).json({ reply })
  } catch {
    res.status(500).json({ reply: 'Something went wrong. Try again.' })
  }
}
