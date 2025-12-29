// API Configuration
const API_BASE_URL = 'http://localhost/feriwala/api';

// Generate or get session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + Date.now();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// API Headers
const getHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'X-Session-ID': getSessionId(),
});

// Product API
export const productApi = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products.php`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products.php?id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getByCategory: async (category: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products.php?category=${encodeURIComponent(category)}`);
      if (!response.ok) throw new Error('Failed to fetch products by category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  create: async (product: {
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    stock?: number;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products.php`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  update: async (product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    stock: number;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products.php`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products.php?id=${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

// Cart API
export const cartApi = {
  get: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart.php`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  addItem: async (productId: number, quantity: number = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart.php`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      if (!response.ok) throw new Error('Failed to add item to cart');
      return await response.json();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  updateItem: async (productId: number, quantity: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart.php`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      if (!response.ok) throw new Error('Failed to update cart item');
      return await response.json();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  removeItem: async (productId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart.php?id=${productId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to remove item from cart');
      return await response.json();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  clear: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart.php?clear=true`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
};

// Orders API
export const orderApi = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders.php`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders.php?id=${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch order');
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  create: async (orderData: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders.php`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to create order');
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};

// Categories API
export const categoryApi = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories.php`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};

export { getSessionId };
