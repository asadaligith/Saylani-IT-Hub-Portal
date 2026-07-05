const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function api(path, opts = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("smth_token") : null;
  const headers = opts.headers || {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = headers["Content-Type"] || "application/json";
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (res.status === 401) {
    localStorage.removeItem("smth_token");
    localStorage.removeItem("smth_user");
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "API error");
  return data;
}
