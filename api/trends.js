import { createClient } from 'redis'

async function kvGet() {
  if (!process.env.REDIS_URL) return []
  const client = createClient({ url: process.env.REDIS_URL })
  await client.connect()
  try {
    const val = await client.get('ai_trends')
    return val ? JSON.parse(val) : []
  } catch {
    return []
  } finally {
    await client.disconnect()
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).end()

  const trends = await kvGet()
  res.status(200).json({ trends })
}
