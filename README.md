# 💒 Thiệp Cưới - Phạm Rin & Quỳnh Như

## Cấu trúc project

```
├── index.html        ← Thiệp cưới
├── api/
│   ├── guests.js     ← API quản lý khách mời (cần password)
│   └── rsvp.js       ← API nhận phúc đáp từ khách
├── package.json
└── vercel.json
```

## Hướng dẫn deploy lên Vercel

### Bước 1: Push lên GitHub
```bash
git init
git add .
git commit -m "init thiep cuoi"
git push
```

### Bước 2: Deploy lên Vercel
1. Vào [vercel.com](https://vercel.com) → Import GitHub repo
2. Vercel tự detect và deploy

### Bước 3: Tạo KV Database
1. Vercel Dashboard → **Storage** → **Create** → **KV**
2. Đặt tên `wedding-db` → Create
3. Tab **Settings** → **Connect to Project** → chọn project thiệp cưới
4. Vercel tự thêm biến môi trường `KV_REST_API_URL` và `KV_REST_API_TOKEN`

### Bước 4: Redeploy
Vào Vercel → Project → **Deployments** → **Redeploy** (để load env mới)

## API Endpoints

| Method | URL | Mô tả | Auth |
|--------|-----|--------|------|
| GET | `/api/guests` | Lấy danh sách khách | Không cần |
| POST | `/api/guests` | Thêm khách mới | `x-admin-pass` header |
| DELETE | `/api/guests` | Xoá khách | `x-admin-pass` header |
| PUT | `/api/guests` | Cập nhật trạng thái | `x-admin-pass` header |
| POST | `/api/rsvp` | Khách phúc đáp | Không cần |

## Mật khẩu admin
`huydeptrai`
