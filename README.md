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

