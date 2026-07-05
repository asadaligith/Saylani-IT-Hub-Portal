"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "../components/Card";
import { Input, TextArea, Select } from "../components/Input";
import { Button } from "../components/Button";
import { Badge, StatusBadge } from "../components/Badge";

type LostFoundItem = {
  _id: string;
  user?: { name?: string } | null;
  type: "lost" | "found";
  title: string;
  description?: string;
  image?: string;
  status?: string;
};

export default function LostFoundPage() {
  const [type, setType] = useState<string>("lost");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/lostfound`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("smth_token")}` },
      });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const form = new FormData();
    form.append("type", type);
    form.append("title", title);
    form.append("description", description);
    if (image) form.append("image", image);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/lostfound`, {
        method: "POST",
        body: form,
        headers: { Authorization: `Bearer ${localStorage.getItem("smth_token")}` },
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        setImage(null);
        setType("lost");
        fetchItems();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const filteredItems = filterType === "all" ? items : items.filter(item => item.type === filterType);

  return (
    <div className="container">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Lost & Found</h1>
        <p className="text-text-light">Help find lost items or report something you've found on campus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="Report an Item" subtitle="Lost or Found?" icon="📍" />
            <CardBody>
              <form onSubmit={submit} className="space-y-4">
                <Select
                  label="Item Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  options={[
                    { value: "lost", label: "Lost Item" },
                    { value: "found", label: "Found Item" },
                  ]}
                />

                <Input
                  type="text"
                  label="Title"
                  placeholder="e.g., Blue Backpack"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <TextArea
                  label="Description"
                  placeholder="Provide details about the item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-text-light">Upload Image</label>
                  <div className="border-2 border-dashed border-slate-700 bg-slate-900/30 rounded-xl p-6 text-center hover:border-primary hover:bg-slate-900/70 transition-all duration-200 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input" className="cursor-pointer flex flex-col items-center">
                      <span className="text-3xl mb-2">📷</span>
                      <span className="text-sm text-text-light font-medium">
                        {image ? image.name : "Click to upload image"}
                      </span>
                    </label>
                  </div>
                </div>

                <Button type="submit" variant="secondary" className="w-full">
                  Submit Report
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Items List Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Recent Items"
              subtitle={`${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''}`}
              icon="📋"
            />
            <CardBody>
              {/* Filter */}
              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterType === "all"
                      ? "bg-primary text-white"
                      : "bg-slate-900 border border-slate-800 text-text-light hover:bg-slate-800 hover:text-foreground"
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setFilterType("lost")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterType === "lost"
                      ? "bg-error text-white"
                      : "bg-slate-900 border border-slate-800 text-text-light hover:bg-slate-800 hover:text-foreground"
                  }`}
                >
                  Lost
                </button>
                <button
                  onClick={() => setFilterType("found")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterType === "found"
                      ? "bg-success text-white"
                      : "bg-slate-900 border border-slate-800 text-text-light hover:bg-slate-800 hover:text-foreground"
                  }`}
                >
                  Found
                </button>
              </div>

              {/* Items */}
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item._id} className="bg-slate-900/30 border border-slate-800/80 rounded-xl overflow-hidden hover:border-primary/25 hover:bg-slate-900/70 transition-all duration-300">
                      <div className="flex gap-4 p-4">
                        {/* Image */}
                        {item.image && (
                          <div className="flex-shrink-0">
                            <img
                              src={
                                item.image.startsWith("http://") || item.image.startsWith("https://")
                                  ? item.image
                                  : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${item.image}`
                              }
                              alt={item.title}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
                            <Badge variant={item.type === "lost" ? "error" : "success"} size="small">
                              {item.type === "lost" ? "Lost" : "Found"}
                            </Badge>
                          </div>

                          {item.description && (
                            <p className="text-sm text-text-light mb-2 line-clamp-2">{item.description}</p>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-light">
                              By: {item.user?.name || "Anonymous"}
                            </span>
                            {item.status && <StatusBadge status={item.status} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-2xl mb-2">📭</p>
                  <p className="text-text-light">No items found</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
