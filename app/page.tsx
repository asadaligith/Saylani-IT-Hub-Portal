import Link from "next/link";
import { Button } from "./components/Button";
import { Card, CardHeader, CardBody, CardFooter } from "./components/Card";

export default function Home() {
  const features = [
    {
      icon: "🔍",
      title: "Lost & Found",
      description: "Report and find lost items on campus with ease",
    },
    {
      icon: "📝",
      title: "Submit Complaints",
      description: "Raise concerns and track resolution status",
    },
    {
      icon: "🤝",
      title: "Volunteer",
      description: "Join events and contribute to the community",
    },
    {
      icon: "🔔",
      title: "Notifications",
      description: "Stay updated with important announcements",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden border-b border-[#1e293b]/40 bg-gradient-to-b from-[#0f172a]/20 to-transparent">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulseGlow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulseGlow" style={{ animationDelay: "3s" }} />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <div className="inline-block mb-6 px-4 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full">
                <span className="bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">Welcome to Saylani Mass IT Hub</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                <span className="block text-foreground">Campus</span>
                <span className="block bg-gradient-to-r from-primary-light via-blue-400 to-secondary-light bg-clip-text text-transparent">Digital Hub</span>
              </h1>

              <p className="text-lg text-text-light mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                Your unified campus platform. Easily report lost items, submit facility complaints, join community volunteer drives, and stay updated with real-time alerts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/auth/register" className="btn btn-primary btn-large">
                  Get Started 🚀
                </Link>
                <Link href="/lost-found" className="btn btn-outline btn-large">
                  Explore Features
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto md:mx-0 border-t border-[#1e293b]/60 pt-8">
                <div>
                  <div className="text-3xl font-extrabold text-primary-light">2500+</div>
                  <p className="text-xs text-text-light/80 mt-1 uppercase tracking-wider font-semibold">Students</p>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-secondary-light">500+</div>
                  <p className="text-xs text-text-light/80 mt-1 uppercase tracking-wider font-semibold">Resolved</p>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-primary-light">1000+</div>
                  <p className="text-xs text-text-light/80 mt-1 uppercase tracking-wider font-semibold">Volunteers</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Floating Card 1 */}
                <div className="absolute top-10 -left-6 bg-slate-900/90 border border-slate-800 rounded-xl shadow-2xl p-4 max-w-xs backdrop-blur-md transition-all duration-300 hover:scale-105 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-lg shadow-inner shadow-primary-light/10">📍</div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Lost Keys Reported</p>
                      <p className="text-[10px] text-text-light/70 mt-0.5">Audi 1 Seminar Hall • 10m ago</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute bottom-10 right-[-10px] bg-slate-900/90 border border-slate-800 rounded-xl shadow-2xl p-4 max-w-xs backdrop-blur-md transition-all duration-300 hover:scale-105 z-20" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center text-lg shadow-inner shadow-secondary-light/10">🤝</div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Volunteer Shift Active</p>
                      <p className="text-[10px] text-text-light/70 mt-0.5">Tech Seminar Helper • Live Now</p>
                    </div>
                  </div>
                </div>

                {/* Main Graphic Container */}
                <div className="bg-gradient-to-tr from-primary/10 via-slate-900 to-secondary/10 border border-slate-800/80 rounded-3xl h-96 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl shadow-blue-500/5">
                  <div className="absolute w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
                  
                  {/* Decorative mesh */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                  
                  <span className="text-9xl font-black bg-gradient-to-r from-primary-light via-white to-secondary-light bg-clip-text text-transparent transform group-hover:scale-105 transition-transform duration-500 select-none">
                    S
                  </span>
                  <span className="text-xs text-text-light/50 tracking-widest uppercase mt-4 font-semibold select-none">
                    Saylani Mass IT Hub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-transparent">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              Explore Our Modules
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Simplifying campus life with direct tools built for speed and community support.
            </p>
          </div>

          <div className="grid-responsive">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover:border-primary/30 transition-all duration-300">
                <CardBody className="p-8 text-center flex flex-col items-center">
                  <div className="text-5xl mb-6 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0f172a] via-[#090d16] to-[#041a12] border-t border-[#1e293b]/40 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
        </div>
        <div className="container text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Connect?
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto mb-10">
            Join thousands of students and volunteers making campus life more connected, helpful, and transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/register"
              className="btn btn-secondary btn-large font-bold shadow-lg"
            >
              Register Now ✍️
            </Link>
            <Link
              href="/auth/login"
              className="btn btn-outline btn-large font-bold"
            >
              Sign In to Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
