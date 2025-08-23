# Kristalball - Military Asset Management System
## Comprehensive Project Documentation

---

## 1. PROJECT OVERVIEW

### Description
Kristalball is a comprehensive military asset management system designed for tactical operations and logistics. The system provides real-time tracking, assignment management, and expenditure monitoring for military assets across multiple bases.

### Key Features
- Real-time dashboard with operational metrics
- Asset tracking and inventory management
- Personnel assignment and expenditure tracking
- Base-to-base transfer coordination
- Purchase and procurement management
- Role-based access control (RBAC)
- Military-themed UI with tactical design elements

### Assumptions
- Users have basic web browser capabilities
- Internet connectivity available for cloud deployment
- MongoDB database for persistent storage
- Modern JavaScript environment (ES6+)

### Limitations
- Currently supports single-tenant architecture
- Limited to predefined asset categories
- No real-time notifications (push notifications)
- Basic reporting functionality
- No integration with external military systems

---

## 2. TECH STACK & ARCHITECTURE

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for database operations
- **JWT** for authentication and session management
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** with functional components and hooks
- **Tailwind CSS** for styling with military theme
- **Framer Motion** for animations and transitions
- **GSAP** for advanced animations
- **React Hot Toast** for notifications
- **Heroicons** for UI icons

### Database
- **Primary:** MongoDB Atlas (cloud)
- **Fallback:** Local MongoDB
- **Development:** In-memory storage for demo

### Architecture Rationale
- **MERN Stack:** Chosen for rapid development and JavaScript consistency
- **MongoDB:** Document-based storage fits the hierarchical military structure
- **JWT:** Stateless authentication suitable for distributed deployment
- **Tailwind CSS:** Utility-first approach enables rapid UI development
- **Microservices Pattern:** Separate route handlers for different domains

---

## 3. DATA MODELS / SCHEMA

### Core Entities

```sql
-- Bases (Military Installations)
CREATE TABLE bases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  commander VARCHAR(100),
  capacity INTEGER DEFAULT 1000,
  established DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users (Personnel)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  base_id INTEGER REFERENCES bases(id),
  base_name VARCHAR(100),
  base_location VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Assets (Military Equipment)
CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  serial_number VARCHAR(100),
  base_id INTEGER REFERENCES bases(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Assignments (Personnel-Asset Relations)
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER REFERENCES assets(id),
  assigned_to_user_id INTEGER REFERENCES users(id),
  assigned_by INTEGER REFERENCES users(id),
  quantity INTEGER NOT NULL,
  assignment_date DATE NOT NULL,
  return_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transfers (Base-to-Base Asset Movement)
CREATE TABLE transfers (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER REFERENCES assets(id),
  from_base_id INTEGER REFERENCES bases(id),
  to_base_id INTEGER REFERENCES bases(id),
  quantity INTEGER NOT NULL,
  transfer_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  requested_by INTEGER REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Purchases (Asset Procurement)
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER REFERENCES assets(id),
  base_id INTEGER REFERENCES bases(id),
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10,2),
  total_cost DECIMAL(10,2),
  purchase_date DATE NOT NULL,
  vendor VARCHAR(255),
  purchase_order VARCHAR(100),
  purchased_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Relationships
- Users → Bases (Many-to-One)
- Assets → Bases (Many-to-One)
- Assignments → Assets, Users (Many-to-One)
- Transfers → Assets, Bases (Many-to-One)
- Purchases → Assets, Bases (Many-to-One)

---

## 4. RBAC EXPLANATION

### Role Hierarchy
1. **Admin** - Full system access
2. **Base Commander** - Base-wide management
3. **Logistics Officer** - Supply chain operations
4. **Inventory Manager** - Asset tracking only

### Access Levels

| Feature | Admin | Base Commander | Logistics Officer | Inventory Manager |
|---------|-------|----------------|-------------------|-------------------|
| View All Bases | ✅ | ❌ | ❌ | ❌ |
| Asset Creation | ✅ | ✅ | ❌ | ❌ |
| Assignment Management | ✅ | ✅ | ❌ | ❌ |
| Purchase Records | ✅ | ✅ | ✅ | ❌ |
| Transfer Initiation | ✅ | ✅ | ✅ | ❌ |
| View Reports | ✅ | ✅ | ✅ | ✅ |

### Enforcement Method

```javascript
// Middleware-based authorization
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage in routes
router.post('/', authenticateToken, 
  authorizeRole(['admin', 'base_commander']), 
  createAsset);
```

### Role-Based Features
- **Route Protection:** Each endpoint checks user role permissions
- **UI Conditional Rendering:** Frontend components show/hide based on user role
- **Data Filtering:** Backend filters data based on user's base and role
- **Action Logging:** All role-based actions are logged for audit trails

---

## 5. API LOGGING

### Transaction Logging Implementation

```javascript
const logActivity = (action) => {
  return async (req, res, next) => {
    try {
      const logData = {
        user_id: req.user?.id,
        action,
        resource: req.path,
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        timestamp: new Date()
      };
      
      // Log to database
      console.log('Activity Log:', logData);
      next();
    } catch (error) {
      console.error('Logging error:', error);
      next(); // Continue even if logging fails
    }
  };
};
```

### Logged Activities
- User authentication (login/logout)
- Asset creation/modification
- Assignment creation/status changes
- Transfer operations
- Purchase records
- Expenditure tracking

### Log Storage
- Console output for development
- Database storage for audit trails
- Structured JSON format for analysis
- Error tracking for debugging

### Log Format
```json
{
  "timestamp": "2024-08-23T10:30:00Z",
  "user_id": 123,
  "action": "CREATE_ASSET",
  "resource": "/api/assets",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "details": {
    "asset_name": "M4A1 Carbine",
    "quantity": 25
  }
}
```

---

## 6. SETUP INSTRUCTIONS

### Prerequisites
- Node.js 14+ 
- MongoDB Atlas account (or local MongoDB)
- Git for version control

### Backend Setup

```bash
# 1. Clone repository
git clone https://github.com/Pradheep-S/kristalball.git
cd kristalball/backend

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret

# 4. Seed database (optional)
node seedData.js

# 5. Start server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
# 1. Navigate to frontend
cd ../frontend

# 2. Install dependencies
npm install

# 3. Environment configuration
# Create .env file:
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# 4. Start development server
npm start
# Frontend runs on http://localhost:3000
```

### Database Setup

```bash
# Option 1: MongoDB Atlas (Recommended)
# 1. Create account at https://cloud.mongodb.com
# 2. Create cluster and get connection string
# 3. Update MONGODB_URI in backend/.env

# Option 2: Local MongoDB
# 1. Install MongoDB locally
# 2. Start MongoDB service
# 3. Use local connection string
```

### Environment Variables

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kristalball
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=5000
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

### Demo Accounts
```
Admin: admin / admin123
Commander: commander / commander123
Logistics: logistics / logistics123
Demo User: demo / demo123
```

---

## 7. API ENDPOINTS

### Authentication Routes

```
POST /api/auth/signup          - Register new user
POST /api/auth/login           - User authentication
GET  /api/auth/profile         - Get user profile
PUT  /api/auth/profile         - Update user profile
POST /api/auth/logout          - User logout
GET  /api/auth/bases           - Get available bases
```

### Asset Management

```
GET    /api/assets             - List assets (filtered by base/role)
POST   /api/assets             - Create new asset (admin/commander)
GET    /api/assets/:id         - Get asset details
PATCH  /api/assets/:id/quantity - Update asset quantity
GET    /api/assets/dashboard   - Dashboard metrics
```

### Assignment Operations

```
GET    /api/assignments         - List assignments
POST   /api/assignments         - Create assignment (admin/commander)
PATCH  /api/assignments/:id/status - Update assignment status
GET    /api/assignments/expenditures - List expenditures
POST   /api/assignments/expenditures - Record expenditure
GET    /api/assignments/stats/summary - Assignment statistics
```

### Transfer Management

```
GET    /api/transfers          - List transfers
POST   /api/transfers          - Initiate transfer
GET    /api/transfers/:id      - Transfer details
GET    /api/transfers/stats/summary - Transfer statistics
```

### Purchase Tracking

```
GET    /api/purchases          - List purchases
POST   /api/purchases          - Record purchase
GET    /api/purchases/:id      - Purchase details
```

### Sample API Requests

#### Create New Asset
```javascript
POST /api/assets
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "M4A1 Carbine",
  "category": "Weapons",
  "serial_number": "M4-2024-001",
  "quantity": 25,
  "status": "available"
}

// Response
{
  "message": "Asset created successfully",
  "asset": {
    "id": 1,
    "name": "M4A1 Carbine",
    "category": "Weapons",
    "base_id": 1,
    "quantity": 25,
    "created_at": "2024-08-23T10:30:00Z"
  }
}
```

#### User Login
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

// Response
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "base_name": "Fort Liberty"
  }
}
```

### Error Handling
- Standardized error responses
- HTTP status codes (400, 401, 403, 404, 500)
- Detailed error messages for development
- Generic messages for production security

### Response Format
```javascript
// Success Response
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}

// Error Response
{
  "success": false,
  "error": "Validation failed",
  "details": ["Username is required", "Password must be at least 8 characters"]
}
```

---

## DEPLOYMENT CONSIDERATIONS

### Production Environment
- Use environment-specific configuration files
- Enable HTTPS/SSL certificates
- Configure proper CORS policies
- Set up database connection pooling
- Implement rate limiting and security headers

### Performance Optimization
- Database indexing on frequently queried fields
- Caching strategies for static data
- Image optimization and CDN usage
- Code splitting and lazy loading
- Minification and compression

### Security Measures
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Secure session management
- Regular security audits

---

