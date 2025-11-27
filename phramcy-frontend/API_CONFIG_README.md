# API Configuration Guide

## Overview
Your pharmacy frontend now uses centralized API configuration for easy deployment switching between local development and AWS production environments.

## Files Created/Modified

### Environment Files
- `.env.local` - Local development configuration
- `.env.production` - Production (AWS) configuration

### Configuration
- `src/config/api.js` - Centralized API endpoints configuration

### Updated Components
- `src/pages/Login.jsx`
- `src/pages/Signup.jsx`
- `src/Admin/AdminDashboard.jsx`
- `src/User/CartPage.jsx`
- `src/User/OrderPage.jsx`
- `src/Admin/Inventory.jsx`

## Usage

### Local Development
```bash
npm run dev:local
# or simply
npm run dev
```

### Production Build
```bash
npm run build:prod
```

### Testing Production Config Locally
```bash
npm run dev:prod
```

## Environment Configuration

### Local (.env.local)
```
VITE_API_BASE_URL=http://localhost
VITE_USER_SERVICE_PORT=8081
VITE_CART_SERVICE_PORT=8084
VITE_ORDER_SERVICE_PORT=8083
VITE_DRUG_SERVICE_PORT=8086
VITE_SUPPLIER_SERVICE_PORT=8085
```

### Production (.env.production)
```
VITE_API_BASE_URL=https://your-aws-api-gateway-url.com
VITE_USER_SERVICE_PORT=
VITE_CART_SERVICE_PORT=
VITE_ORDER_SERVICE_PORT=
VITE_DRUG_SERVICE_PORT=
VITE_SUPPLIER_SERVICE_PORT=
```

## AWS Deployment Setup

1. **Update .env.production** with your AWS API Gateway URL:
   ```
   VITE_API_BASE_URL=https://your-actual-api-gateway-url.amazonaws.com
   ```

2. **Remove port configurations** for production (leave empty):
   ```
   VITE_USER_SERVICE_PORT=
   VITE_CART_SERVICE_PORT=
   VITE_ORDER_SERVICE_PORT=
   VITE_DRUG_SERVICE_PORT=
   VITE_SUPPLIER_SERVICE_PORT=
   ```

3. **Build for production**:
   ```bash
   npm run build:prod
   ```

## API Endpoints Structure

All API calls now use the centralized `API_ENDPOINTS` object:

```javascript
import { API_ENDPOINTS } from '../config/api';

// Examples:
fetch(API_ENDPOINTS.USER.LOGIN)
fetch(API_ENDPOINTS.CART.GET)
fetch(API_ENDPOINTS.DRUG.GET_ALL)
```

## Benefits

✅ **Single source of truth** for all API configurations
✅ **Easy environment switching** with npm scripts
✅ **No hardcoded URLs** in components
✅ **AWS deployment ready**
✅ **Maintainable and scalable**

## Next Steps for AWS Deployment

1. Set up AWS API Gateway
2. Configure your backend services
3. Update `.env.production` with actual AWS URLs
4. Deploy using `npm run build:prod`