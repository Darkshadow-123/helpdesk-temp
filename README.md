# Capacity Helpdesk

A full-stack MERN helpdesk ticketing system.

## Features

- **Authentication** - JWT-based login system
- **Dashboard** - View and manage support tickets
- **Create Tickets** - Add new tickets with customer info
- **Ticket Details** - Full ticket view with customer details
- **Public/Private Messages** - Tab switching between customer messages and internal notes
- **Message Composer** - Rich toolbar with @mentions, private notes

## Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Project Structure

```
helpdesk/
├── client/           # React frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
├── server/           # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── data/
│   └── index.js
├── render.yaml       # Render deployment config
└── package.json      # Root scripts
```

## Local Development

```bash
# Install all dependencies
npm run install:all

# Run development (both frontend & backend)
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:10000

## Deployment to Render

### Option 1: Automatic (render.yaml)

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create new "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = a secure random string
7. Click "Create Web Service"

### Option 2: Manual

```bash
# Build the frontend
npm run build

# Start production server
npm run start
```

The app will be available on Render's URL (port 10000).

## Demo Accounts

After first run, these accounts are seeded:
- `sarah@capacity.com` / `password123`
- `mike@capacity.com` / `password123`
- `emma@capacity.com` / `password123`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| MONGODB_URI | MongoDB connection string | Yes (production) |
| JWT_SECRET | Secret for JWT tokens | Yes |
| NODE_ENV | Set to `production` for production | No |
