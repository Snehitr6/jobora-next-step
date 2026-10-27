import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import CompanyLogo from "./CompanyLogo";

const popularSearches = [
  "Frontend",
  "Designer",
  "Data Analyst",
  "Remote",
];

const recommendedJobs = [
  {
    title: "Frontend Developer",
    company: "Google",
    initials: "G",
    label: "Engineering",
  },
  {
    title: "Product Designer",
    company: "Figma",
    initials: "F",
    label: "Design",
  },
  {
    title: "Data Scientist",
    company: "Microsoft",
    initials: "M",
    label: "Data & AI",
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const searchJobs = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) params.set("q", keyword.trim());
    if (location.trim()) params.set("location", location.trim());

    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handlePopularSearch = (term) => {
    navigate(`/jobs?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#f7f5ff]">
      {/* Background effects */}
      <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-96 w-96 rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 -z-10 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl" />

<div className="mx-auto grid w-full max-w-[1600px] items-center gap-8 px-5 py-2 sm:px-8 sm:py-4 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-10 lg:py-5 xl:gap-14 xl:px-12 xl:py-6">
            {/* LEFT SIDE */}
        <div className="min-w-0 animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/90 px-4 py-2.5 text-xs font-bold text-violet-600 shadow-sm sm:text-sm">
            <Sparkles size={16} />
            Your next chapter starts here
          </div>

          <h1 className="max-w-full text-[clamp(2.5rem,4.5vw,4.6rem)] font-extrabold leading-[1.08] tracking-[-0.06em] text-slate-950">
            <span className="block">Find work that</span>

            <span className="relative mt-1 block text-[clamp(2.25rem,4.1vw,4.25rem)] leading-[1.12] tracking-[-0.055em] text-violet-600 sm:whitespace-nowrap">
              moves you forward.
              <svg
                viewBox="0 0 580 18"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-3 w-full"
              >
                <path
                  d="M4 12C145 2 365 2 574 11"
                  stroke="#c4b5fd"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Discover opportunities that match your skills, connect with
            inspiring companies, and take the next step in your career.
          </p>

          {/* SEARCH FORM */}
          <form
            onSubmit={searchJobs}
            className="mt-7 w-full max-w-[780px] rounded-2xl border border-white bg-white p-2 shadow-[0_18px_60px_-25px_rgba(91,60,160,0.24)] transition focus-within:border-violet-200 sm:p-2.5"
          >
            <div className="grid min-w-0 gap-1 md:grid-cols-[1fr_0.85fr_auto] md:items-center">
              <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 focus-within:bg-violet-50/60 sm:px-4">
                <Search size={21} className="shrink-0 text-violet-500" />

                <input
                  type="search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Job title or keyword"
                  aria-label="Job title or keyword"
                  className="w-full min-w-0 border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                />
              </label>

              <label className="flex min-w-0 items-center gap-3 rounded-xl border-t border-slate-100 px-3 py-3 focus-within:bg-violet-50/60 md:border-l md:border-t-0 md:px-4">
                <MapPin size={21} className="shrink-0 text-violet-500" />

                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="City or remote"
                  aria-label="Job location"
                  className="w-full min-w-0 border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                />
              </label>

              <button
                type="submit"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                Search Jobs
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </form>

          {/* POPULAR SEARCHES */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-bold text-slate-700">
              Popular:
            </span>

            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handlePopularSearch(term)}
                className="rounded-full border border-white bg-white/80 px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 sm:text-sm"
              >
                {term}
              </button>
            ))}
          </div>

          {/* BENEFITS */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-violet-100 pt-5">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={16} />
              </span>
              Easy job discovery
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                <BriefcaseBusiness size={15} />
              </span>
              Save opportunities
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: DASHBOARD PREVIEW */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          {/* Floating card */}
          <div className="absolute -left-1 top-[30%] z-20 flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-[0_15px_45px_-15px_rgba(36,22,72,0.22)] backdrop-blur sm:-left-6 sm:p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Search size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Find your fit
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Your next opportunity
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/90 bg-white/90 p-4 shadow-[0_30px_90px_-35px_rgba(76,45,140,0.28)] backdrop-blur-xl sm:p-6 md:p-7">
            {/* Dashboard heading */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Your career dashboard
                </p>

                <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  Opportunities for you
                </h2>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <BriefcaseBusiness size={23} />
              </div>
            </div>

            {/* Stats */}
            <div className="mb-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-violet-50 p-4 sm:p-5">
                <p className="text-xs font-medium text-slate-500">
                  Featured roles
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  120+
                </p>
                <p className="mt-1 text-xs font-medium text-violet-600">
                  Across industries
                </p>
              </div>

              <div className="rounded-2xl bg-sky-50 p-4 sm:p-5">
                <p className="text-xs font-medium text-slate-500">
                  Top companies
                </p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  50+
                </p>
                <p className="mt-1 text-xs font-medium text-sky-600">
                  Explore employers
                </p>
              </div>
            </div>

            {/* Recommended jobs */}
            <div className="rounded-2xl border border-slate-100 bg-white p-3.5 sm:p-4">
              <div className="mb-2 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Recommended for you
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Explore featured roles
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
                  Fresh picks
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {recommendedJobs.map((job) => (
                  <button
                    key={job.title}
                    type="button"
                    onClick={() =>
                      navigate(`/jobs?q=${encodeURIComponent(job.title)}`)
                    }
                    className="group flex w-full min-w-0 items-center gap-3 py-3 text-left transition hover:bg-violet-50/50 sm:gap-3.5"
                  >
                    <CompanyLogo
                      company={job.company}
                      initials={job.initials}
                      className="h-11 w-11 rounded-xl"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800 transition group-hover:text-violet-700">
                        {job.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {job.company}
                        <span className="mx-1.5 text-slate-300">•</span>
                        {job.label}
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-600"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-3 text-sm font-bold text-violet-700 transition hover:border-violet-200 hover:bg-violet-100"
              >
                Explore all opportunities
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Dashboard footer */}
            <div className="mt-4 flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <TrendingUp size={16} className="text-emerald-600" />
                Your next move starts here
              </div>

              <button
                type="button"
                onClick={() => navigate("/jobs")}
                aria-label="Browse jobs"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-violet-100 hover:text-violet-700"
              >
                <ArrowDownRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}