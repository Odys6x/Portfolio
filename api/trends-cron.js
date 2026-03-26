import { createClient } from 'redis'

const HN_TOP = 'https://hacker-news.firebaseio.com/v0/topstories.json'
const HN_ITEM = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
const MAX_STORED = 50
const FETCH_COUNT = 80

const KEYWORD_RE = /\b(ai|llm|gpt|claude|gemini|openai|anthropic|deepseek|mistral|llama|copilot|language model|neural|machine learning|deep learning|transformer|embedding|fine.tun|diffusion|generative|artificial intelligence|pytorch|tensorflow|computer vision|nlp|natural language|robotics|autonomous|rust|golang|typescript|webassembly|wasm|kubernetes|docker|linux|open source|postgres|serverless|programming|arxiv|benchmark|hugging face|reinforcement learning|multimodal)\b/i

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', '') }
  catch { return 'news.ycombinator.com' }
}

// ── Groq: score relevance, fix tags, add summaries ──
async function enrichWithGroq(items) {
  if (!process.env.GROQ_API_KEY || items.length === 0) return items

  const storyList = items.map((item, i) => `${i}. "${item.title}"`).join('\n')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1200,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [{
        role: 'user',
        content: `You are a tech content curator for AI/ML professionals. Evaluate these HackerNews story titles for relevance.

Return ONLY this JSON shape:
{"results": [{"index": N, "score": N, "tag": "LLM|ML|AI|Tech", "summary": "one sentence under 15 words"}]}

Rules:
- score 1–10 (only include stories with score >= 6)
- LLM = language models, chatbots, GPT, Claude, Gemini, Copilot
- ML = machine learning, neural networks, training, datasets, PyTorch
- AI = general AI, robotics, computer vision, autonomous systems
- Tech = other interesting tech (Rust, Linux, open source tools, etc.)
- summary: plain English, no hype, factual
- Skip low-quality/clickbait titles

Stories:
${storyList}`,
      }],
    }),
  })

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) return items

  const parsed = JSON.parse(content)
  const results = parsed.results || []

  return results
    .sort((a, b) => b.score - a.score)
    .map(ev => ({
      ...items[ev.index],
      tag: ev.tag,
      summary: ev.summary,
      aiScore: ev.score,
    }))
}

// ── Redis helpers ──
async function withRedis(fn) {
  const client = createClient({ url: process.env.REDIS_URL })
  await client.connect()
  try { return await fn(client) }
  finally { await client.disconnect() }
}

async function kvGet() {
  if (!process.env.REDIS_URL) return []
  try {
    return await withRedis(async (client) => {
      const val = await client.get('ai_trends')
      return val ? JSON.parse(val) : []
    })
  } catch { return [] }
}

async function kvSet(trends) {
  if (!process.env.REDIS_URL) return
  await withRedis((client) => client.set('ai_trends', JSON.stringify(trends)))
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    // 1. Fetch top story IDs
    const idsRes = await fetch(HN_TOP)
    const allIds = await idsRes.json()
    const ids = allIds.slice(0, FETCH_COUNT)

    // 2. Fetch item details in parallel
    const items = await Promise.all(
      ids.map(id => fetch(HN_ITEM(id)).then(r => r.json()).catch(() => null))
    )

    // 3. Keyword pre-filter (reduces what Groq needs to evaluate)
    const preFiltered = items
      .filter(item => item && item.title && item.url && item.score > 30 && KEYWORD_RE.test(item.title))
      .map(item => ({
        id: item.id,
        title: item.title,
        url: item.url,
        domain: getDomain(item.url),
        score: item.score,
        time: item.time,
      }))

    // 4. Groq pass: score, retag, summarise
    const enriched = await enrichWithGroq(preFiltered)

    // 5. Merge with existing, dedup, cap at 50
    const existing = await kvGet()
    const existingIds = new Set(existing.map(t => t.id))
    const newItems = enriched.filter(t => !existingIds.has(t.id))

    const merged = [...newItems, ...existing]
      .sort((a, b) => b.time - a.time)
      .slice(0, MAX_STORED)

    await kvSet(merged)

    res.status(200).json({ ok: true, added: newItems.length, total: merged.length })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
}
