"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginPayload, loginHelper } from "../helpers/register";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/auth-store";

const Login = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: loginHelper,
    onSuccess: async (data) => {
      if (data.user) {
        setUser(data.user);
      }
      await queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      router.push("/");
    },
    onError: (error) => {
      console.log("LOGIN ERROR:", error);
    },
  });

  const onSubmit = (data: LoginPayload) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        {/* Email */}
        <div>
          <input
            placeholder="Email"
            type="email"
            className="w-full p-3 rounded bg-neutral-900 border border-white/10"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded bg-neutral-900 border border-white/10"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Error from backend */}
        {mutation.isError && (
          <p className="text-red-400 text-sm">
            {(mutation.error as Error).message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          {mutation.isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
