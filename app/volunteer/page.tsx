"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody } from "../components/Card";
import { Input, TextArea, Select } from "../components/Input";
import { Button } from "../components/Button";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [eventName, setEventName] = useState("");
  const [availability, setAvailability] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const events = [
    { value: "campus-cleanup", label: "Campus Cleanup" },
    { value: "mentoring", label: "Student Mentoring" },
    { value: "tech-workshop", label: "Tech Workshop" },
    { value: "community-service", label: "Community Service" },
    { value: "sports-event", label: "Sports Event" },
    { value: "others", label: "Other Activities" },
  ];

  const availabilityOptions = [
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "flexible", label: "Flexible" },
  ];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setError("");
    
    if (!name.trim() || !eventName || !availability) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/volunteers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("smth_token")}`,
        },
        body: JSON.stringify({ name, event: eventName, availability }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Registered successfully! Thank you for volunteering.");
        setName("");
        setEventName("");
        setAvailability("");
        setTimeout(() => setMsg(""), 5000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Volunteer Program</h1>
        <p className="text-text-light">Join our community and make a difference on campus!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="Register as Volunteer" subtitle="Join our team" icon="🤝" />
            <CardBody>
              <form onSubmit={submit} className="space-y-4">
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon="👤"
                  required
                />

                <Select
                  label="Preferred Event"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  options={events}
                />

                <Select
                  label="Availability"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  options={availabilityOptions}
                />

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-error">
                    {error}
                  </div>
                )}

                {msg && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-success">
                    {msg}
                  </div>
                )}

                <Button type="submit" variant="secondary" className="w-full" loading={loading}>
                  Register Now
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Benefits Card */}
          <Card className="mt-6">
            <CardHeader title="Why Volunteer?" icon="✨" />
            <CardBody>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-xl">🏆</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">Recognition</p>
                    <p className="text-xs text-text-light">Certificate of appreciation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">🤝</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">Community</p>
                    <p className="text-xs text-text-light">Meet like-minded students</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">📚</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">Experience</p>
                    <p className="text-xs text-text-light">Build valuable skills</p>
                  </div>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Events Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Upcoming Events" subtitle="Join one of these activities" icon="📅" />
            <CardBody>
              <div className="grid gap-4">
                {[
                  {
                    icon: "🧹",
                    title: "Campus Cleanup",
                    desc: "Help keep our campus clean and green",
                    date: "Every Saturday",
                    slots: "25 volunteers",
                  },
                  {
                    icon: "📚",
                    title: "Student Mentoring",
                    desc: "Guide junior students in their academics",
                    date: "Flexible Schedule",
                    slots: "15 volunteers",
                  },
                  {
                    icon: "💻",
                    title: "Tech Workshop",
                    desc: "Teach coding and tech skills to peers",
                    date: "Bi-weekly",
                    slots: "10 volunteers",
                  },
                  {
                    icon: "❤️",
                    title: "Community Service",
                    desc: "Participate in community outreach programs",
                    date: "Monthly",
                    slots: "30 volunteers",
                  },
                  {
                    icon: "⚽",
                    title: "Sports Events",
                    desc: "Organize and manage campus sports activities",
                    date: "Every Friday",
                    slots: "20 volunteers",
                  },
                  {
                    icon: "🎉",
                    title: "Campus Events",
                    desc: "Help organize seminars and celebrations",
                    date: "As Needed",
                    slots: "Unlimited",
                  },
                ].map((event, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-primary transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl group-hover:scale-110 transition-transform">
                        {event.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                        <p className="text-sm text-text-light mb-3">{event.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-text-light">
                          <span>📅 {event.date}</span>
                          <span>👥 {event.slots}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card hoverable={false}>
              <CardBody>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-text-light mt-1">Active Volunteers</p>
                </div>
              </CardBody>
            </Card>
            <Card hoverable={false}>
              <CardBody>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">45+</p>
                  <p className="text-xs text-text-light mt-1">Events Hosted</p>
                </div>
              </CardBody>
            </Card>
            <Card hoverable={false}>
              <CardBody>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2000+</p>
                  <p className="text-xs text-text-light mt-1">Hours Served</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
