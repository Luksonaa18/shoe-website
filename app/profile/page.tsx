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
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-gray-400 text-sm animate-pulse">
          Loading profile…
        </span>
      </div>
    );
  }
  if (isError) {
    if (error.status === 401) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <p className="text-gray-500 text-sm">You are not logged in</p>

          <div className="flex gap-3">
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
              Login
            </button>

            <button
              onClick={() => (window.location.href = "/register")}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Register
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-red-500 text-sm">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="text-xs underline text-gray-500 hover:text-gray-800 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md space-y-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {profile.name}
            </h1>
            <p className="text-sm text-gray-400">{profile.email}</p>
          </div>
        </div>

        {/* Extra fields — add whatever AuthUser contains */}
        <div className="border-t border-gray-100 pt-4 space-y-2">
          <Row label="ID" value={profile.id} />
        </div>
      </div>
    </main>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="text-gray-700 font-medium">{value}</span>
  </div>
);

export default ProfilePage;
