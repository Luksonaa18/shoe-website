export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export type UserRole = "user" | "admin";
export type ApiError = Error & {
  status?: number;
};

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
};

type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

const getErrorMessage = (data: ApiErrorResponse | null, fallback: string) => {
  if (!data) return fallback;

  if (Array.isArray(data.message)) {
    return data.message.join(", ");
  }

  if (typeof data.message === "string") {
    return data.message;
  }

  if (typeof data.error === "string") {
    return data.error;
  }

  return fallback;
};

export const registerHelper = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

export const loginHelper = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

  return data as AuthResponse;
};

export const fetchMeHelper = async (): Promise<AuthUser> => {
  const res = await fetch(`${API_URL}/user/me`, {
    method: "GET",
    credentials: "include",
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
