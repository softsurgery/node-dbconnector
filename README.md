# 🐬 Node.js MySQL Client API

This Node.js application allows users to connect to any MySQL database by sending their credentials, get a per-user token, and make custom SQL queries using that token.

## 🚀 Features

- Connect to any MySQL server with host, port, user, and password.
- Get a connection token per user.
- Send SQL queries via API using your token.
- Uses `nodemon` in development mode for hot reloading.
- Dockerized for easy development and deployment.


## 📦 Requirements

- Node.js (via Docker or locally)
- Docker (optional but recommended)
- MySQL (local or remote)


## 📁 Project Structure

```yml
├── app.js
├── db/
│ └── connectionManager.js
├── package.json
├── Dockerfile
└── README.md
```

## 🔧 API Usage

### 1. Connect to a MySQL server

**POST** `/connect`

```json
{
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "yourpassword",
  "database": "optional_db"
}
```
Response:
```json
{
  "success": true,
  "token": "your-session-token"
}
```

### 2. Make a query using the token

**POST** `/query`

```
json
{
  "token": "your-session-token",
  "sql": "SHOW DATABASES",
  "params": []
}
```

Response:

```json
{
  "success": true,
  "results": [ ... ]
}
```

## 🐳 Running with Docker
1. Build the image
```bash
docker build -t mysql-client-app .
```

2. Run the app
```bash
docker run -p 3000:3000 -v $(pwd):/usr/src/app mysql-client-app
```

✅ It uses nodemon by default to auto-reload on code changes.

## 🛠 Development (Without Docker)
```bash
npm install
npm run dev
```

## 📦 Environment Configuration
No .env file is needed. All MySQL credentials are passed in the /connect request body.

# ⚠️ Warning
* No authentication system — anyone with access to the endpoint can connect/query any MySQL server.
* Use only in secure, controlled environments.
* Add proper security, input validation, and connection timeout handling before production.

# ✨ Todo
* Add authentication (JWT or API key)
* Auto-expire tokens and clean up old connections
* Support connection pools
* Rate limiting and query validation







