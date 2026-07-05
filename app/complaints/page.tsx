"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "../components/Card";
import { Input, TextArea, Select } from "../components/Input";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/Badge";

type Complaint = {
  _id: string;
  category: string;
  description: string;
  status?: string;
  user?: { name?: string } | null;
  createdAt?: string;
};

export default function ComplaintsPage() {
  const [category, setCategory] = useState("Internet");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = [
    { value: "Internet", label: "Internet Issues" },
    { value: "Electricity", label: "Electricity Problems" },
    { value: "Water", label: "Water Supply" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Others", label: "Other Issues" },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/complaints`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("smth_token")}` },
      });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("smth_token")}`,
        },
        body: JSON.stringify({ category, description }),
      });

      if (res.ok) {
        setDescription("");
        setCategory("Internet");
        fetchItems();
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  }

  const filteredItems =
    filterCategory === "all" ? items : items.filter((item) => item.category === filterCategory);

  const categoryEmojis: Record<string, string> = {
    Internet: "📡",
    Electricity: "⚡",
    Water: "💧",
    Maintenance: "🔧",
    Others: "❓",
  };

  return (
    <div className="container">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Submit a Complaint</h1>
        <p className="text-text-light">Report issues to help improve our campus facilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="New Complaint" subtitle="Tell us what's wrong" icon="📝" />
            <CardBody>
              <form onSubmit={submit} className="space-y-4">
                <Select
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={categories}
                />

                <TextArea
                  label="Description"
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  required
                />

                <Button type="submit" variant="primary" className="w-full">
                  Submit Complaint
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Info Card */}
          <Card className="mt-6">
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">⏱️</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">Response Time</p>
                    <p className="text-xs text-text-light">Usually within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">Confidentiality</p>
                    <p className="text-xs text-text-light">Your privacy is protected</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Complaints List Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Recent Complaints"
              subtitle={`${filteredItems.length} complaint${filteredItems.length !== 1 ? "s" : ""}`}
              icon="📋"
            />
            <CardBody>
              {/* Filters */}
              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterCategory === "all"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilterCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterCategory === cat.value
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-foreground hover:bg-gray-200"
                    }`}
                  >
                    {categoryEmojis[cat.value]} {cat.label}
                  </button>
                ))}
              </div>

              {/* Complaints */}
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="space-y-4">
                  {filteredItems.map((complaint) => (
                    <div
                      key={complaint._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl">
                            {categoryEmojis[complaint.category] || "❓"}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">
                              {complaint.category}
                            </h4>
                            <p className="text-sm text-text-light mt-1">
                              {complaint.description}
                            </p>
                          </div>
                        </div>
                        {complaint.status && <StatusBadge status={complaint.status} />}
                      </div>

                      <div className="flex items-center justify-between text-xs text-text-light">
                        <span>By: {complaint.user?.name || "Anonymous"}</span>
                        {complaint.createdAt && (
                          <span>
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-2xl mb-2">✅</p>
                  <p className="text-text-light">No complaints in this category</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
