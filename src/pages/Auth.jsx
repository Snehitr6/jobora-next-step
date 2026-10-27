import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useJobs } from "../context/JobContext";

export default function Auth({ mode = "login" }) {
  const isSignup = mode === "signup";

  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useJobs();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    if (isSignup && name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      login(cleanEmail, isSignup ? name.trim() : "");
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        {/* Left branding panel */}
        <section className="relative hidden min-h-screen overflow-hidden bg-[#201344] text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-16">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-violet-600/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <Link
            to="/"
            className="relative z-10 inline-flex w-fit items-center gap-2 text-2xl font-extrabold tracking-tight text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500">
              <BriefcaseBusiness size={22} />
            </span>
            jobora<span className="-ml-2 text-violet-400">.</span>
          </Link>

          <div className="relative z-10 my-12 max-w-xl">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
              <Sparkles size={16} />
              Your next chapter starts here
            </span>

            <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight xl:text-6xl">
              Your talent deserves the{" "}
              <span className="text-violet-300">
                right opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-violet-100/80 xl:text-lg">
              Explore career possibilities, discover inspiring teams, and
              keep your job search organized in one simple place.
            </p>

            {/* Feature highlights */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-400/15 text-violet-200">
                  <BriefcaseBusiness size={20} />
                </span>
                <div>
                  <h3 className="font-bold">Explore opportunities</h3>
                  <p className="mt-1 text-sm leading-5 text-violet-100/70">
                    Discover roles that match your skills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200">
                  <CheckCircle2 size={20} />
                </span>
                <div>
                  <h3 className="font-bold">Stay organized</h3>
                  <p className="mt-1 text-sm leading-5 text-violet-100/70">
                    Save jobs and track your applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
              <p className="text-lg font-semibold leading-7">
                “A new opportunity can change everything.”
              </p>
              <p className="mt-2 text-sm text-violet-100/70">
                Make your next move with Jobora.
              </p>
            </div>
          </div>

          <p className="relative z-10 text-xs text-violet-200/70">
            © {new Date().getFullYear()} Jobora. Career opportunities in one place.
          </p>
        </section>

        {/* Right authentication panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-10 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 lg:hidden"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                <BriefcaseBusiness size={21} />
              </span>
              jobora<span className="-ml-2 text-violet-600">.</span>
            </Link>

            <Link
              to="/"
              className="mb-9 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
            >
              <ArrowLeft size={17} />
              Back to home
            </Link>

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-violet-600">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                {isSignup ? "Start your journey" : "Welcome back"}
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {isSignup ? "Create your account" : "Sign in to Jobora"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {isSignup
                  ? "Join Jobora and discover your next career opportunity."
                  : "Continue exploring opportunities and managing your job search."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  {!isSignup && (
                    <span className="text-xs text-slate-400">
                      Demo authentication
                    </span>
                  )}
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200/60 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl hover:shadow-violet-600/25 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting
                  ? "Please wait..."
                  : isSignup
                    ? "Create account"
                    : "Sign in"}
                {!submitting && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              {isSignup ? "Already have an account?" : "New to Jobora?"}{" "}
              <Link
                to={isSignup ? "/login" : "/signup"}
                className="font-extrabold text-violet-600 transition hover:text-violet-800"
              >
                {isSignup ? "Sign in" : "Create account"}
              </Link>
            </p>

            {/* Demo notice */}
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-violet-600"
              />
              <p className="text-xs leading-5 text-slate-500">
                This is a frontend demo. Any valid email and a password of at
                least six characters will work. Authentication is not verified
                by a backend, and passwords are not stored or validated against
                an account.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
