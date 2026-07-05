const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function api<T = any>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("smth_token")
      : null;

  const headers = new Headers(opts.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("smth_token");
      localStorage.removeItem("smth_user");
    }
    throw new Error("Unauthorized");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "API error");
  }

  return data as T;
}
