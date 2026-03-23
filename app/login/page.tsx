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
    formState: { errors },
  } = useForm<LoginPayload>();
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: loginHelper,
    onSuccess: async (data) => {
      if (data.user) {
        setUser(data.user)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="email"
        type="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        placeholder="password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters" },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {mutation.isError && <p>{(mutation.error as Error).message}</p>}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
