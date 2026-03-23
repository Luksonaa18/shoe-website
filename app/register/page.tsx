"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterPayload, registerHelper } from "../helpers/register";
import { useRouter } from "next/navigation";

const Register = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>();

  const registerMutation = useMutation({
    mutationFn: registerHelper,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user',"me"] });
      router.push("/login");
    },
  });

  const onSubmit = (data: RegisterPayload) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
      >
        <h1 className="text-2xl font-semibold">Register</h1>

        {/* Name */}
        <div>
          <input
            placeholder="Name"
            className="w-full p-3 rounded bg-neutral-900 border border-white/10"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            placeholder="Email"
            type="email"
            className="w-full p-3 rounded bg-neutral-900 border border-white/10"
            {...register("email", {
              required: "Email is required",
            })}
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
              minLength: {
                value: 6,
                message: "Min 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Error from backend */}
        {registerMutation.isError && (
          <p className="text-red-400 text-sm">
            {(registerMutation.error as Error).message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || registerMutation.isPending}
          className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
        <div className="w-full items-center justify-center text-center">
          <button className="text-sm text-blue-400 underline cursor-pointer" onClick={()=>router.push('/login')}> გაქვს ექაუნთი ?</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
