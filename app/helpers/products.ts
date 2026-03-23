import { useAuthStore } from "@/auth-store";
import { BackendProduct, Cart, Product } from "../type/product-cart";
import { API_URL } from "./register";

// -------------------- PRODUCTS --------------------

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");

  const data: BackendProduct[] = await res.json();

  return data.map((p) => ({
    id: p._id, // <-- map backend `_id` to frontend `id`
    title: p.title,
    description: p.description,
    price: p.price,
    quantity: p.quantity,
    isInStock: p.isInStock,
  }));
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch product");

  return await res.json(); // ✅ no mapping
};

// -------------------- CART --------------------

export const fetchCart = async (token: string): Promise<Cart> => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch cart");

  return await res.json(); // ✅ no mapping
};

export const addToCart = async (
  productId: string,
  quantity: number,
): Promise<Cart> => {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) throw new Error("Failed to add to cart");

  return await res.json(); // ✅ no mapping
};

// -------------------- DELETE PRODUCT --------------------

export const removeProduct = async (id: string) => {
  const token = useAuthStore.getState().token;
  const res = await fetch(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete product");
  }

  return data;
};
