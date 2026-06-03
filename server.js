const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const ADMIN_PASS = 'huydeptrai';
const GUESTS_FILE = path.join(__dirname, 'guests.json');

// Initialize guests file if it doesn't exist
async function initGuestsFile() {
  try {
    await fs.access(GUESTS_FILE);
  } catch {
    await fs.writeFile(GUESTS_FILE, JSON.stringify([]));
  }
}

// Read guests from file
async function getGuests() {
  try {
    const data = await fs.readFile(GUESTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save guests to file
async function saveGuests(guests) {
  await fs.writeFile(GUESTS_FILE, JSON.stringify(guests, null, 2));
}

// Handle API requests
async function handleAPI(req, res, pathname) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-pass');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse request body
  let body = '';
  for await (const chunk of req) {
    body += chunk.toString();
  }
  const data = body ? JSON.parse(body) : {};

  if (pathname === '/api/guests') {
    const guests = await getGuests();

    // GET: Get all guests
    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(guests));
      return;
    }

    // Check password for other methods
    const pass = req.headers['x-admin-pass'];
    if (pass !== ADMIN_PASS) {
      res.writeHead(401);
      res.end(JSON.stringify({ error: 'Sai mật khẩu' }));
      return;
    }

    // POST: Add guest
    if (req.method === 'POST') {
      const { name } = data;
      if (!name) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Thiếu tên' }));
        return;
      }

      if (guests.find(g => g.name === name)) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Tên đã tồn tại' }));
        return;
      }

      guests.push({
        name,
        status: 'wait',
        added: new Date().toLocaleDateString('vi-VN'),
        rsvp: null
      });

      await saveGuests(guests);
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, guests }));
      return;
    }

    // DELETE: Remove guest
    if (req.method === 'DELETE') {
      const { name } = data;
      const filtered = guests.filter(g => g.name !== name);
      await saveGuests(filtered);
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, guests: filtered }));
      return;
    }

    // PUT: Update guest status
    if (req.method === 'PUT') {
      const { name, status } = data;
      const guest = guests.find(g => g.name === name);
      if (!guest) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Không tìm thấy' }));
        return;
      }
      guest.status = status;
      await saveGuests(guests);
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, guests }));
      return;
    }
  }

  if (pathname === '/api/rsvp') {
    if (req.method === 'POST') {
      const { name, attending, count, message } = data;

      if (!name || !attending) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Thiếu thông tin' }));
        return;
      }

      const guests = await getGuests();
      const guest = guests.find(g => g.name === name);

      if (!guest) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Không tìm thấy tên trong danh sách' }));
        return;
      }

      guest.status = attending;
      guest.rsvp = {
        attending,
        count: count || 1,
        message: message || '',
        respondedAt: new Date().toISOString()
      };

      await saveGuests(guests);
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, guest }));
      return;
    }
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method not allowed' }));
}

// Create server
const server = http.createServer(async (req, res) => {
  const pathname = req.url.split('?')[0];

  // API routes
  if (pathname.startsWith('/api/')) {
    try {
      await handleAPI(req, res, pathname);
    } catch (error) {
      console.error('API Error:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
    return;
  }

  // Serve static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);

  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    }[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

// Start server
initGuestsFile().then(() => {
  server.listen(PORT, () => {
    console.log(`\n🌸 Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`🔐 Mật khẩu admin: ${ADMIN_PASS}`);
    console.log(`📝 Dữ liệu khách được lưu tại: ${GUESTS_FILE}\n`);
  });
});
