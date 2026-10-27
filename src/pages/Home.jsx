
import { useState } from "react";
import { ArrowRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import {
  AboutSection,
  CategoriesSection,
  CompaniesSection,
} from "../components/Sections";

import { jobs } from "../data/jobs";

export default function Home() {
  const [showAll, setShowAll] = useState(false);

  const featuredJobs = jobs.filter((job) => job.featured);
  const displayedJobs = showAll
    ? featuredJobs
    : featuredJobs.slice(0, 3);

  return (
    <main>
      <Hero />

      <section className="section-space bg-white">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#6d4aff]">
                <BriefcaseBusiness size={16} />
                Handpicked opportunities
              </div>

              <h2 className="section-title">
                Featured job openings
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Explore selected opportunities from our demo job listings.
              </p>
            </div>

            <Link
              to="/jobs"
              className="hidden items-center gap-2 pb-1 text-sm font-bold text-[#6d4aff] transition hover:gap-3 sm:flex"
            >
              View all jobs <ArrowRight size={17} />
            </Link>
          </div>

          {displayedJobs.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {displayedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
              No featured jobs are available.
            </p>
          )}

          {featuredJobs.length > 3 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll((previous) => !previous)}
                className="btn-secondary"
              >
                {showAll
                  ? "Show fewer jobs"
                  : "Show more featured jobs"}
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/jobs" className="btn-primary">
              Explore all jobs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CategoriesSection />

      <CompaniesSection />

      <section className="pb-16">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[28px] bg-[#201547] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />

            <div className="relative grid items-center gap-7 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                  <CheckCircle2 size={15} />
                  Your next opportunity awaits
                </div>

                <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Ready to make your next move?
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
                  Explore available roles and organize your job search with Jobora.
                </p>
              </div>

              <Link
                to="/jobs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#5635e8] transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Find your next job <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
    </main>
  );
}
