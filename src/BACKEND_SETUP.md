# BACKEND SETUP GUIDE - YAYASAN BAITULJANNAH
**Complete Backend Implementation Guide with MySQL**

---

## 📋 TABLE OF CONTENTS

1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Database Setup](#database-setup)
5. [Backend Installation](#backend-installation)
6. [Environment Configuration](#environment-configuration)
7. [Running the Application](#running-the-application)
8. [API Testing](#api-testing)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## 🔧 TECH STACK

### Backend:
- **Node.js** (v18+ recommended)
- **Express.js** (Web framework)
- **TypeScript** (Type safety)
- **MySQL** (Database)
- **mysql2** (MySQL driver)
- **JWT** (Authentication)
- **bcrypt** (Password hashing)
- **multer** (File upload)
- **nodemailer** (Email sending)

### Optional:
- **Redis** (Caching)
- **PM2** (Process manager)
- **Docker** (Containerization)

---

## ✅ PREREQUISITES

### Required Software:

1. **Node.js & npm**
   ```bash
   # Download from https://nodejs.org/
   node --version  # Should be v18+
   npm --version   # Should be 9+
   ```

2. **MySQL Server**
   ```bash
   # Download from https://www.mysql.com/downloads/
   # Or use XAMPP, MAMP, or Docker
   mysql --version  # Should be 8.0+
   ```

3. **Git** (for version control)
   ```bash
   git --version
   ```

### Optional:
- **MySQL Workbench** (Database management GUI)
- **Postman** (API testing)
- **Docker** (for containerization)

---

## 📁 PROJECT STRUCTURE

Create a separate backend project folder:

```
baituljannah-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── jwt.ts
│   │   └── upload.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── students.controller.ts
│   │   ├── teachers.controller.ts
│   │   ├── classes.controller.ts
│   │   ├── materials.controller.ts
│   │   ├── assignments.controller.ts
│   │   ├── grades.controller.ts
│   │   ├── attendance.controller.ts
│   │   ├── finance.controller.ts
│   │   ├── library.controller.ts
│   │   ├── ppdb.controller.ts
│   │   ├── career.controller.ts
│   │   └── content.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── student.model.ts
│   │   ├── teacher.model.ts
│   │   └── ... (other models)
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── students.routes.ts
│   │   └── ... (other routes)
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── email.service.ts
│   │   ├── upload.service.ts
│   │   └── ... (other services)
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── uploads/
│   ├── images/
│   ├── documents/
│   └── temp/
├── logs/
├── tests/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ DATABASE SETUP

### Step 1: Install MySQL

#### Windows (XAMPP):
1. Download XAMPP from https://www.apachefriends.org/
2. Install and start MySQL service
3. Default credentials: `root` / no password

#### macOS (Homebrew):
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

#### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo mysql_secure_installation
```

### Step 2: Create Database

```bash
# Login to MySQL
mysql -u root -p

# Or using MySQL Workbench
```

### Step 3: Run Schema

```sql
-- Execute the schema file
SOURCE /path/to/database/schema.sql;

-- Verify database created
SHOW DATABASES;
USE baituljannah_school;
SHOW TABLES;
```

### Step 4: Load Seed Data

```sql
-- Execute seed file
SOURCE /path/to/database/seed.sql;

-- Verify data
SELECT * FROM users LIMIT 5;
SELECT * FROM school_units;
```

### Step 5: Create Database User (Recommended for Production)

```sql
-- Create dedicated user
CREATE USER 'baituljannah_user'@'localhost' IDENTIFIED BY 'strong_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON baituljannah_school.* TO 'baituljannah_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Test connection
mysql -u baituljannah_user -p baituljannah_school
```

---

## 🚀 BACKEND INSTALLATION

### Step 1: Create Backend Project

```bash
# Create project folder
mkdir baituljannah-backend
cd baituljannah-backend

# Initialize Node.js project
npm init -y

# Install TypeScript
npm install -D typescript @types/node @types/express ts-node nodemon

# Initialize TypeScript
npx tsc --init
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install express cors helmet morgan dotenv

# Database
npm install mysql2

# Authentication & Security
npm install jsonwebtoken bcryptjs express-validator
npm install -D @types/jsonwebtoken @types/bcryptjs

# File Upload
npm install multer
npm install -D @types/multer

# Email
npm install nodemailer
npm install -D @types/nodemailer

# Date handling
npm install date-fns

# Rate limiting
npm install express-rate-limit

# Utilities
npm install uuid
npm install -D @types/uuid
```

### Step 3: Configure TypeScript

Edit `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 4: Configure package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "test": "jest",
    "lint": "eslint . --ext .ts"
  }
}
```

---

## ⚙️ ENVIRONMENT CONFIGURATION

### Step 1: Copy Environment File

```bash
cp .env.example .env
```

### Step 2: Configure Database

Edit `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=baituljannah_school
DB_USER=root
DB_PASSWORD=your_password

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:5173
```

---

## 💻 BASIC BACKEND CODE EXAMPLES

### 1. Database Connection (`src/config/database.ts`)

```typescript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'baituljannah_school',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection error:', err);
  });

export default pool;
```

### 2. Main App (`src/app.ts`)

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import studentsRoutes from './routes/students.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/students', studentsRoutes);
// Add more routes...

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});

export default app;
```

### 3. Auth Controller Example (`src/controllers/auth.controller.ts`)

```typescript
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const [users]: any = await db.query(
      `SELECT u.*, up.full_name, up.phone, up.photo_url 
       FROM users u 
       LEFT JOIN user_profiles up ON u.id = up.user_id 
       WHERE u.email = ? AND u.status = 'active'`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Update last login
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Remove sensitive data
    delete user.password_hash;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          full_name: user.full_name,
          phone: user.phone,
          photo_url: user.photo_url
        }
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

export const register = async (req: Request, res: Response) => {
  // Implementation...
};

export const logout = async (req: Request, res: Response) => {
  // Implementation...
};
```

### 4. Auth Middleware (`src/middleware/auth.middleware.ts`)

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};
```

### 5. Routes Example (`src/routes/auth.routes.ts`)

```typescript
import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getCurrentUser);

export default router;
```

---

## 🏃 RUNNING THE APPLICATION

### Development Mode

```bash
# Install dependencies
npm install

# Run database migrations
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql

# Start development server
npm run dev

# Server will start on http://localhost:3001
```

### Production Mode

```bash
# Build TypeScript
npm run build

# Start production server
npm start

# Or use PM2
npm install -g pm2
pm2 start dist/app.js --name baituljannah-api
pm2 save
pm2 startup
```

---

## 🧪 API TESTING

### Using cURL

```bash
# Health check
curl http://localhost:3001/api/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baituljannah.sch.id","password":"Admin123!"}'

# Get users (with token)
curl http://localhost:3001/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import API collection
2. Set environment variables
3. Test endpoints

### Test Credentials

```
Super Admin:
Email: admin@baituljannah.sch.id
Password: Admin123!

Admin Unit:
Email: admin.sdit@baituljannah.sch.id
Password: Admin123!

Teacher:
Email: ahmad@baituljannah.sch.id
Password: Guru123!

Student:
Email: rizki@student.baituljannah.sch.id
Password: Siswa123!

Parent:
Email: ahmad.fauzi@parent.baituljannah.sch.id
Password: Parent123!
```

---

## 🚀 DEPLOYMENT

### VPS/Cloud Server (Ubuntu)

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install MySQL
sudo apt install mysql-server

# 3. Clone repository
git clone https://github.com/yourusername/baituljannah-backend.git
cd baituljannah-backend

# 4. Install dependencies
npm install

# 5. Configure environment
cp .env.example .env
nano .env

# 6. Setup database
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql

# 7. Build application
npm run build

# 8. Install PM2
npm install -g pm2

# 9. Start application
pm2 start dist/app.js --name baituljannah-api
pm2 save
pm2 startup

# 10. Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/baituljannah-api

# Nginx configuration:
server {
    listen 80;
    server_name api.baituljannah.sch.id;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/baituljannah-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 11. Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.baituljannah.sch.id
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/app.js"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: baituljannah_school
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/1-schema.sql
      - ./database/seed.sql:/docker-entrypoint-initdb.d/2-seed.sql
    restart: unless-stopped

volumes:
  mysql_data:
```

Run with Docker:

```bash
docker-compose up -d
```

---

## 🐛 TROUBLESHOOTING

### Common Issues

#### 1. Database Connection Error
```
Error: ER_ACCESS_DENIED_ERROR: Access denied for user
```

**Solution:**
```bash
# Check MySQL is running
sudo systemctl status mysql

# Reset password
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

#### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3002
```

#### 3. CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
```typescript
// In app.ts
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

#### 4. JWT Verification Failed
```
Error: jwt malformed
```

**Solution:**
- Check JWT_SECRET in .env matches
- Ensure token format is correct: "Bearer <token>"
- Check token expiration

---

## 📚 ADDITIONAL RESOURCES

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Last Updated**: December 1, 2024  
**Version**: 1.0.0  
**Support**: dev@baituljannah.sch.id
