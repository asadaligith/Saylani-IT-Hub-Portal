"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-secondary mb-4">Saylani Mass IT Hub</h3>
            <p className="text-sm text-text-light">
              Campus portal for students and staff, providing easy access to lost & found, complaints, and volunteer opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-text-light hover:text-secondary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/lost-found" className="text-text-light hover:text-secondary transition-colors">
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="text-text-light hover:text-secondary transition-colors">
                  Complaints
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-text-light hover:text-secondary transition-colors">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-text-light hover:text-secondary transition-colors">
                  Report Lost Items
                </a>
              </li>
              <li>
                <a href="#" className="text-text-light hover:text-secondary transition-colors">
                  Submit Complaints
                </a>
              </li>
              <li>
                <a href="#" className="text-text-light hover:text-secondary transition-colors">
                  Join Volunteers
                </a>
              </li>
              <li>
                <a href="#" className="text-text-light hover:text-secondary transition-colors">
                  Get Notifications
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-text-light">
              <li>Email: support@saylani.edu</li>
              <li>Phone: +92 (0)21 5020-4000</li>
              <li>Location: SMIT Campus</li>
            </ul>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-text-light">
            &copy; {currentYear} Saylani Mass IT Hub. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-text-light hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-text-light hover:text-secondary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
