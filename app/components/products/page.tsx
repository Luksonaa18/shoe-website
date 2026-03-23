"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, removeProduct } from "../../helpers/products";
import { Product } from "../../type/product-cart";
import { useAuthStore } from "@/auth-store";

const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const deleteMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      console.error("Delete error:", err);
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-400 animate-pulse">პროდუქტები იტვირთება…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-red-400">შეცდომა: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="text-sm underline text-gray-400 hover:text-gray-200"
        >
          ხელახლა სცადე
        </button>
      </div>
    );
  }
  console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products?.map((product) => (
        <div
          key={product.id}
          className="flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden text-white hover:scale-105 transition-transform duration-200 relative"
        >
          {user?.role === "admin" && (
            <button
              onClick={() => {
                console.log("DELETE ID:", product.id);
                deleteMutation.mutate(product.id);
              }}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md"
            >
              Delete
            </button>
          )}

          {/* Image Placeholder */}
          <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-500 text-sm">
            სურათი არ არის
          </div>

          {/* Product Info */}
          <div className="p-4 flex flex-col flex-1">
            <h2 className="font-semibold text-lg mb-1">{product.title}</h2>
            <p className="text-gray-400 text-sm flex-1 wrap-break-word">
              {product.description || "აღწერა ხელმისაწვდომი არ არის"}
            </p>
            <p className="mt-3 font-medium">${product.price}</p>
            <p
              className={`mt-1 text-xs ${
                product.isInStock ? "text-green-400" : "text-red-400"
              }`}
            >
              {product.isInStock ? "მარაგშია" : "არაა მარაგში"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
