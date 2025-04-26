//export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/": ["guest", "user", "admin"], // Home page
  "/login": ["guest"], // Login page
  "/register": ["guest"], // Registration page
  "/admin": ["admin"], // Admin dashboard
  "/user": ["user", "admin"], // User dashboard
  "/profile": ["user", "admin"], // User profile
  "/settings": ["user", "admin"], // Account settings
  "/users": ["admin"], // User management (admin only)
  "/products": ["guest", "user", "admin"], // Product listing
  "/products/:id": ["guest", "user", "admin"], // Product details
  "/cart": ["user"], // Shopping cart
  "/checkout": ["user"], // Checkout process
  "/orders": ["user", "admin"], // Order history (user) or management (admin)
  "/reports": ["admin"], // Reports (admin only)
  "/wishlist": ["user"], // Wishlist
  "/support": ["guest", "user", "admin"], // Support or contact page
};
