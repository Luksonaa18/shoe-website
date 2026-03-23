// src/type/product-cart.ts
export type BackendProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  isInStock: boolean;
};

export type Product = {
  id: string; // frontend uses `id`
  title: string;
  description: string;
  price: number;
  quantity: number;
  isInStock: boolean;
};
export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  _id: string;
  userId: string;
  items: CartItem[];
};
