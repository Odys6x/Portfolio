const HN_TOP = 'https://hacker-news.firebaseio.com/v0/topstories.json'
const HN_ITEM = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
const MAX_STORED = 50
const FETCH_COUNT = 80

const KEYWORD_RE = /\b(ai|llm|gpt|claude|gemini|openai|anthropic|deepseek|mistral|llama|copilot|language model|neural|machine learning|deep learning|transformer|embedding|fine.tun|diffusion|generative|artificial intelligence|pytorch|tensorflow|computer vision|nlp|natural language|robotics|autonomous|rust|golang|typescript|webassembly|wasm|kubernetes|docker|linux|open source|postgres|serverless|programming|arxiv|benchmark|hugging face|reinforcement learning|multimodal)\b/i

function getTag(title) {
  const t = title.toLowerCase()
  if (/llm|gpt|claude|gemini|chatgpt|openai|anthropic|deepseek|mistral|llama|language model|copilot/.test(t)) return 'LLM'
  if (/machine learning|deep learning|neural|pytorch|tensorflow|computer vision|nlp|fine.tun|embedding|reinforcement/.test(t)) return 'ML'
  if (/ai|artificial intelligence|generative|diffusion|multimodal|robotics|autonomous/.test(t)) return 'AI'
  return 'Tech'
}

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', '') }
  catch { return 'news.ycombinator.com' }
}

async function kvGet() {
  if (!process.env.KV_REST_API_URL) return []
  try {
    const res = await fetch(process.env.KV_REST_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['GET', 'ai_trends']),
    })
    const data = await res.json()
    return data.result ? JSON.parse(data.result) : []
  } catch {
    return []
  }
}

async function kvSet(trends) {
  if (!process.env.KV_REST_API_URL) return
  await fetch(process.env.KV_REST_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['SET', 'ai_trends', JSON.stringify(trends)]),
  })
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

    // 3. Filter: must have title + url + match keywords + score > 30
    const filtered = items
      .filter(item => item && item.title && item.url && item.score > 30 && KEYWORD_RE.test(item.title))
      .map(item => ({
        id: item.id,
        title: item.title,
        url: item.url,
        domain: getDomain(item.url),
        score: item.score,
        time: item.time,
        tag: getTag(item.title),
      }))

    // 4. Merge with existing, dedup by id, cap at MAX_STORED
    const existing = await kvGet()
    const existingIds = new Set(existing.map(t => t.id))
    const newItems = filtered.filter(t => !existingIds.has(t.id))

    const merged = [...newItems, ...existing]
      .sort((a, b) => b.time - a.time)
      .slice(0, MAX_STORED)

    await kvSet(merged)

    res.status(200).json({ ok: true, added: newItems.length, total: merged.length })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
}
