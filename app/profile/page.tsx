"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError, AuthUser, fetchMeHelper } from "../helpers/register";

export const meQueryKey = ["user", "me"] as const;

const ProfilePage = () => {
  const {
    data: profile,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery<AuthUser, ApiError>({
    queryKey: meQueryKey,
    queryFn: fetchMeHelper,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <span className="text-gray-400 text-sm animate-pulse">Loading profile…</span>
      </div>
    );
  }

  if (isError) {
    if (error.status === 401) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950">
          <p className="text-gray-500 text-sm">You are not logged in</p>
          <div className="flex gap-3">
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => (window.location.href = "/register")}
              className="px-4 py-2 text-sm rounded-lg border border-white/10 text-white hover:bg-white/5 transition"
            >
              Register
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-neutral-950">
        <p className="text-red-400 text-sm">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="text-xs underline text-gray-500 hover:text-gray-300 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">

        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{profile.name}</h1>
            <p className="text-sm text-gray-400">{profile.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <Row label="User ID" value={profile.id} />
        </div>

      </div>
    </main>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="text-gray-300 font-medium truncate ml-4">{value}</span>
  </div>
);

export default ProfilePage;