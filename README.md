# Umiya Enterprise - Inventory & Billing Management System

A comprehensive web application for managing lubricant, battery, and tire inventory, sales, purchases, warranties, billing, and discounts.

## 🎯 Features

- 📦 **Inventory Management** - Track stock for lubricants, batteries, and tires
- 💰 **Sales Module** - Process customer sales with real-time tracking
- 📥 **Purchase Management** - Manage supplier purchases and stock replenishment
- 🛡️ **Warranty Management** - Track product warranties and claims
- 📋 **Billing System** - Generate invoices with itemized details
- 🎁 **Discount Management** - Apply and track discount codes
- 👤 **User Authentication** - Role-based access control (Admin, Sales, Manager)
- 📊 **Dashboard & Reports** - Visual analytics and business insights

## 💻 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Deployment:** Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

```bash
# Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
node migrations.js
npm run dev

# Frontend Setup (in new terminal)
cd frontend
npm install
npm start
```

## 📁 Project Structure

```
umiya-enterprise/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 📊 Database Schema

- **users** - User accounts and authentication
- **products** - Lubricants, batteries, tires catalog
- **stock** - Inventory levels by location
- **sales** - Sales transactions
- **invoices** - Billing records
- **purchases** - Purchase orders
- **warranties** - Warranty information
- **discounts** - Discount rules and history

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`

### Modules
- `/products` - Product management
- `/stock` - Inventory tracking
- `/sales` - Sales transactions
- `/invoices` - Invoice generation
- `/purchases` - Purchase orders
- `/warranties` - Warranty management
- `/discounts` - Discount codes
- `/dashboard/stats` - Business analytics

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

Access at: http://localhost:3000

## 📝 License

Proprietary to Umiya Enterprise © 2026
