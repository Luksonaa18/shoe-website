export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export type UserRole = "user" | "admin";

export type ApiError = Error & { status?: number };

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthResponse = {
  message: string;
  user?: AuthUser;
  access_token?: string;
};

type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

const getErrorMessage = (data: ApiErrorResponse | null, fallback: string) => {
  if (!data) return fallback;
  if (Array.isArray(data.message)) return data.message.join(", ");
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  return fallback;
};

// ---------------- REGISTER ----------------
export const registerHelper = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      ...(payload.role ? { role: payload.role } : {}),
    }),
  });

  const data: AuthResponse | ApiErrorResponse | null = await res
    .json()
    .catch(() => null);

  if (!res.ok) {
    throw new Error(
      getErrorMessage(data as ApiErrorResponse, "Failed to register"),
    );
  }

  return data as AuthResponse;
};

// ---------------- LOGIN ----------------
export const loginHelper = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
    }),
  });

  const data: AuthResponse | ApiErrorResponse | null = await res
    .json()
    .catch(() => null);

  if (!res.ok) {
    throw new Error(
      getErrorMessage(data as ApiErrorResponse, "Failed to login"),
    );
  }

  // --- type guard: only store token if it exists ---
  if (data && "access_token" in data && data.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }

  return data as AuthResponse;
};

// ---------------- FETCH ME ----------------
export const fetchMeHelper = async (): Promise<AuthUser> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    const error: ApiError = new Error("No token found");
    error.status = 401;
    throw error;
  }

  const res = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error: ApiError = new Error(
      getErrorMessage(data as ApiErrorResponse, "Failed to fetch user"),
    );
    error.status = res.status;
    throw error;
  }

  return data as AuthUser;
};
