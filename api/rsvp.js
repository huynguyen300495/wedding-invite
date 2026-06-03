import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, attending, count, message } = req.body;

  if (!name || !attending) {
    return res.status(400).json({ error: 'Thiếu thông tin' });
  }

  const guests = (await kv.get('guests')) || [];
  const guest = guests.find(g => g.name === name);

  if (!guest) {
    return res.status(404).json({ error: 'Không tìm thấy tên trong danh sách' });
  }

  // Cập nhật thông tin RSVP
  guest.status = attending;
  guest.rsvp = {
    attending,
    count: count || 1,
    message: message || '',
    respondedAt: new Date().toISOString()
  };

  await kv.set('guests', guests);

  return res.status(200).json({ ok: true, guest });
}
