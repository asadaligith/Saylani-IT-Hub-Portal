"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from "../components/Card";
import { Badge, StatusBadge } from "../components/Badge";
import { Button } from "../components/Button";

type LostFoundItem = {
  _id: string;
  title: string;
  status?: string;
  type?: string;
};

type Complaint = {
  _id: string;
  category: string;
  status?: string;
};

type Volunteer = {
  _id: string;
  name: string;
  event: string;
};

export default function DashboardPage() {
  const [lost, setLost] = useState<LostFoundItem[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [vols, setVols] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const token = localStorage.getItem("smth_token");
      if (!token) return;
      const [lRes, cRes, vRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/lostfound`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/complaints`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/volunteers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const [l, c, v] = await Promise.all([lRes.json(), cRes.json(), vRes.json()]);
      setLost(Array.isArray(l) ? l : []);
      setComplaints(Array.isArray(c) ? c : []);
      setVols(Array.isArray(v) ? v : []);
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { icon: "📍", label: "Lost Items", value: lost.length, color: "from-blue-500 to-blue-600" },
    { icon: "📝", label: "Complaints", value: complaints.length, color: "from-orange-500 to-orange-600" },
    { icon: "🤝", label: "Volunteers", value: vols.length, color: "from-green-500 to-green-600" },
  ];

  return (
    <div className="container">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-text-light">Welcome back! Here's an overview of your campus activities.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <Card key={idx} hoverable={false}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-light mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lost & Found Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader
              title="Lost & Found"
              subtitle={`${lost.length} item${lost.length !== 1 ? 's' : ''}`}
              icon="📍"
            />
            <CardBody>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-800/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : lost.length > 0 ? (
                <div className="space-y-3">
                  {lost.slice(0, 5).map((item) => (
                    <div key={item._id} className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-lg hover:border-primary/20 hover:bg-slate-900/90 transition-all cursor-pointer">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={item.type === "lost" ? "error" : "success"} size="small">
                          {item.type || "unknown"}
                        </Badge>
                        {item.status && <StatusBadge status={item.status} />}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-light text-center py-8">No items found</p>
              )}
            </CardBody>
            <CardFooter className="justify-center">
              <Link href="/lost-found" className="text-primary hover:text-primary-dark font-medium text-sm">
                View all →
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Complaints Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader
              title="Complaints"
              subtitle={`${complaints.length} complaint${complaints.length !== 1 ? 's' : ''}`}
              icon="📝"
            />
            <CardBody>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-800/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : complaints.length > 0 ? (
                <div className="space-y-3">
                  {complaints.slice(0, 5).map((complaint) => (
                    <div key={complaint._id} className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-lg hover:border-primary/20 hover:bg-slate-900/90 transition-all cursor-pointer">
                      <p className="text-sm font-medium text-foreground">{complaint.category}</p>
                      {complaint.status && (
                        <div className="mt-2">
                          <StatusBadge status={complaint.status} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-light text-center py-8">No complaints</p>
              )}
            </CardBody>
            <CardFooter className="justify-center">
              <Link href="/complaints" className="text-primary hover:text-primary-dark font-medium text-sm">
                View all →
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Volunteers Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader
              title="Volunteers"
              subtitle={`${vols.length} volunteer${vols.length !== 1 ? 's' : ''}`}
              icon="🤝"
            />
            <CardBody>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-800/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : vols.length > 0 ? (
                <div className="space-y-3">
                  {vols.slice(0, 5).map((vol) => (
                    <div key={vol._id} className="p-3 bg-slate-900/50 border border-slate-800/60 rounded-lg hover:border-primary/20 hover:bg-slate-900/90 transition-all cursor-pointer">
                      <p className="text-sm font-medium text-foreground">{vol.name}</p>
                      <p className="text-xs text-text-light mt-1">{vol.event}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-light text-center py-8">No volunteers</p>
              )}
            </CardBody>
            <CardFooter className="justify-center">
              <Link href="/volunteer" className="text-primary hover:text-primary-dark font-medium text-sm">
                View all →
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950/80 border border-slate-800/85 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <h2 className="text-2xl font-bold text-foreground mb-6 relative z-10">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <Link href="/lost-found">
            <Button variant="primary" className="w-full justify-center">
              📍 Report Lost Item
            </Button>
          </Link>
          <Link href="/complaints">
            <Button variant="primary" className="w-full justify-center">
              📝 File Complaint
            </Button>
          </Link>
          <Link href="/volunteer">
            <Button variant="secondary" className="w-full justify-center">
              🤝 Volunteer
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-center" onClick={() => window.location.reload()}>
            🔄 Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
}
