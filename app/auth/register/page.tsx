"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      localStorage.setItem('smth_token', data.token);
      localStorage.setItem('smth_user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gray-800 px-8 py-8 text-center border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Create Password</h2>
            <p className="text-gray-400 text-sm mt-2">Create your account password to complete registration</p>
          </div>

          {/* Body */}
          <div className="p-8">
            {err && (
              <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg">
                <p className="text-sm text-red-300 font-medium">{err}</p>
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Full Name"
                required
              />

              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                required
              />

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                helperText="At least 6 characters"
                required
              />

              <Button
                type="submit"
                variant="secondary"
                className="w-full py-3 text-lg"
                loading={loading}
              >
                Create Account
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-secondary hover:text-secondary-light font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
