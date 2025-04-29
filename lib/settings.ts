//export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  // Public routes
  "/": ["guest", "client", "admin"], // Home page
  "/products": ["guest", "client", "admin"], // Product listing
  "/products/:id": ["guest", "client", "admin"], // Product details
  "/categories": ["guest", "client", "admin"], // Category listing
  "/categories/:id": ["guest", "client", "admin"], // Category products
  "/about": ["guest", "client", "admin"], // About page
  "/contact": ["guest", "client", "admin"], // Contact page
  "/support": ["guest", "client", "admin"], // Support page

  // Authentication routes
  "/sign-in": ["guest"], // Login page
  "/sign-up": ["guest"], // Registration page
  "/forgot-password": ["guest"], // Password recovery
  "/reset-password": ["guest"], // Password reset

  // User account routes
  "/client": ["client", "admin"], // User dashboard
  "/client/profile": ["client", "admin"], // Profile settings
  "/client/orders": ["client", "admin"], // Order history
  "/client/addresses": ["client", "admin"], // Saved addresses
  "/client/wishlist": ["client", "admin"], // Wishlist
  "/client/settings": ["client", "admin"], // Account settings

  // Shopping routes
  "/cart": ["client", "admin"], // Shopping cart
  "/checkout": ["client", "admin"], // Checkout process
  "/checkout/success": ["client", "admin"], // Order success
  "/checkout/cancel": ["client", "admin"], // Order cancellation

  // Admin routes
  "/admin": ["admin"], // Admin dashboard
  "/admin/products": ["admin"], // Product management
  "/admin/orders": ["admin"], // Order management
  "/admin/customers": ["admin"], // Customer management
  "/admin/categories": ["admin"], // Category management
  "/admin/reports": ["admin"], // Reports
  "/admin/settings": ["admin"], // Admin settings
};
