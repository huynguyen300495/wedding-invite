import { kv } from './db.js';

const ADMIN_PASS = 'huydeptrai';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-pass');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET: lấy danh sách (không cần pass)
  if (req.method === 'GET') {
    const guests = (await kv.get('guests')) || [];
    return res.status(200).json(guests);
  }

  // Các method khác cần password
  const pass = req.headers['x-admin-pass'];
  if (pass !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Sai mật khẩu' });
  }

  // POST: thêm khách mời
  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Thiếu tên' });

    const guests = (await kv.get('guests')) || [];
    if (guests.find(g => g.name === name)) {
      return res.status(400).json({ error: 'Tên đã tồn tại' });
    }

    guests.push({
      name,
      status: 'wait',
      added: new Date().toLocaleDateString('vi-VN'),
      rsvp: null
    });

    await kv.set('guests', guests);
    return res.status(200).json({ ok: true, guests });
  }

  // DELETE: xoá khách
  if (req.method === 'DELETE') {
    const { name } = req.body;
    let guests = (await kv.get('guests')) || [];
    guests = guests.filter(g => g.name !== name);
    await kv.set('guests', guests);
    return res.status(200).json({ ok: true, guests });
  }

  // PUT: cập nhật trạng thái
  if (req.method === 'PUT') {
    const { name, status } = req.body;
    const guests = (await kv.get('guests')) || [];
    const g = guests.find(g => g.name === name);
    if (!g) return res.status(404).json({ error: 'Không tìm thấy' });
    g.status = status;
    await kv.set('guests', guests);
    return res.status(200).json({ ok: true, guests });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
