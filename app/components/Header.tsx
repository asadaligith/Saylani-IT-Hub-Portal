"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface User {
  name?: string;
  email?: string;
  [key: string]: any;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("smth_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {}
  }, []);

  function logout() {
    localStorage.removeItem("smth_token");
    localStorage.removeItem("smth_user");
    setUser(null);
    window.location.href = "/";
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/lost-found", label: "Lost & Found" },
    { href: "/complaints", label: "Complaints" },
    { href: "/volunteer", label: "Volunteer" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900 shadow-lg">
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image 
            src="/saylani-logo.svg" 
            alt="Saylani" 
            width={140} 
            height={35}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-gray-800 hover:text-secondary transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side - Auth Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-text-light">
                {user.name || user.email}
              </span>
              <button
                onClick={logout}
                className="btn btn-outline btn-small"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="btn btn-outline btn-small">
                Login
              </Link>
              <Link href="/auth/register" className="hidden sm:inline-block btn btn-secondary btn-small">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-800 animate-slideUp">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-gray-700 hover:text-secondary transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary btn-small"
              >
                Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
