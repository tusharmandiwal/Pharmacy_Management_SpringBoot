// API Configuration - Single Gateway
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
};

// Build service URLs
const buildUrl = () => {
  return API_CONFIG.BASE_URL;
};

// API Endpoints
export const API_ENDPOINTS = {
  // User Service
  USER: {
    BASE: buildUrl(),
    LOGIN: `${buildUrl()}/users/login`,
    REGISTER: `${buildUrl()}/users/register`,
    COUNT: `${buildUrl()}/users/count`,
    GET_ALL: `${buildUrl()}/users`,
    DELETE: (email) => `${buildUrl()}/users/delete/${email}`
  },
  
  // Cart Service  
  CART: {
    BASE: buildUrl(),
    GET: `${buildUrl()}/cart`,
    ADD: `${buildUrl()}/cart`,
    INCREASE: (drugId) => `${buildUrl()}/cart/increase/${drugId}`,
    DECREASE: (drugId) => `${buildUrl()}/cart/decrease/${drugId}`,
    CLEAR: `${buildUrl()}/cart/clear`
  },
  
  // Order Service
  ORDER: {
    BASE: buildUrl(),
    PLACE: (paymentMethod) => `${buildUrl()}/orders/place?paymentMethod=${encodeURIComponent(paymentMethod)}`,
    COUNT: `${buildUrl()}/orders/count`,
    GET_ALL: `${buildUrl()}/orders/all`,
    GET_BY_ID: (id) => `${buildUrl()}/orders/${id}`,
    GET_BY_EMAIL: (email) => `${buildUrl()}/orders/email/${email}`,
    APPROVE: (id) => `${buildUrl()}/orders/approve/${id}`,
    REJECT: (id) => `${buildUrl()}/orders/reject/${id}`
  },
  
  // Drug Service
  DRUG: {
    BASE: buildUrl(),
    GET_ALL: `${buildUrl()}/drug`,
    ADD: `${buildUrl()}/drug/add`,
    UPDATE: (id) => `${buildUrl()}/drug/update/${id}`,
    DELETE: (id) => `${buildUrl()}/drug/delete/${id}`,
    COUNT: `${buildUrl()}/drug/count`
  },
  
  // Supplier Service
  SUPPLIER: {
    BASE: buildUrl(),
    GET_ALL: `${buildUrl()}/supplier`,
    GET_BY_ID: (id) => `${buildUrl()}/supplier/${id}`,
    ADD: `${buildUrl()}/supplier`,
    UPDATE: (id) => `${buildUrl()}/supplier/${id}`,
    DELETE: (id) => `${buildUrl()}/supplier/${id}`
  },
  
  // Payment Service
  PAYMENT: {
    BASE: buildUrl(),
    GET_LINK: (orderId) => `${buildUrl()}/payment/link/${orderId}`
  }
};

export default API_ENDPOINTS;