# Deployment Guide

## CORS Issues Fix

The CORS errors you encountered were caused by:

1. **Cross-origin requests**: Your frontend on Vercel (`https://military-mgmt.vercel.app`) was trying to access `http://localhost:5000`
2. **Missing environment configuration**: Hardcoded localhost URLs in the frontend
3. **Incomplete CORS setup**: Backend needed better preflight request handling

## What Was Fixed

### Frontend Changes:
1. **Environment Configuration**: Added `.env` files for different environments
2. **API Configuration**: Created `src/config/api.js` for centralized API URL management
3. **API Utility**: Added `src/utils/api.js` for enhanced error handling
4. **Updated Login Component**: Now uses configurable API endpoints

### Backend Changes:
1. **Enhanced CORS Configuration**: Added more comprehensive CORS options
2. **Preflight Handler**: Added manual OPTIONS request handler
3. **Better Logging**: Enhanced request logging with origin information

## Deployment Steps

### For Production Deployment:

1. **Deploy Backend**:
   - Deploy your backend to a hosting service (Heroku, Railway, Render, etc.)
   - Get your production backend URL (e.g., `https://your-backend.herokuapp.com`)

2. **Update Frontend Environment**:
   ```bash
   # Update frontend/.env.production
   REACT_APP_API_URL=https://your-backend-url.com
   REACT_APP_ENVIRONMENT=production
   ```

3. **Deploy Frontend**:
   - Your Vercel deployment will automatically use `.env.production` in production
   - Make sure the production API URL is correct

### For Local Development:

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm start  # Runs on http://localhost:5000
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start  # Runs on http://localhost:3000
   ```

### Environment Variables:

**Frontend (.env)**:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

**Frontend (.env.production)**:
```
REACT_APP_API_URL=https://your-production-backend-url.com
REACT_APP_ENVIRONMENT=production
```

**Backend (.env)**:
```
PORT=5000
FRONTEND_URL=https://military-mgmt.vercel.app
NODE_ENV=production
# Add your database URLs and other config here
```

## Testing the Fix

1. **Local Testing**:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend  
   cd frontend && npm start
   ```

2. **Production Testing**:
   - Deploy backend first
   - Update `.env.production` with real backend URL
   - Deploy frontend
   - Test login functionality

## Common Issues and Solutions

1. **Still getting CORS errors**:
   - Verify the backend URL in `.env.production`
   - Check that the backend is deployed and accessible
   - Ensure the backend CORS configuration includes your frontend domain

2. **Environment variables not working**:
   - Make sure variables start with `REACT_APP_`
   - Restart the development server after changing `.env` files
   - For Vercel, add environment variables in the dashboard

3. **Network errors**:
   - Check browser network tab for actual error details
   - Verify the backend is running and accessible
   - Check if the API endpoints are correct

The fixes implemented should resolve the CORS issues and make your application work both locally and in production.
