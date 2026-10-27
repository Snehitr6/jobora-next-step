import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Wallet,
} from "lucide-react";
import { useJobs } from "../context/JobContext";
import CompanyLogo from "./CompanyLogo";

export default function JobCard({ job }) {
  const { savedJobs, toggleSaved } = useJobs();

  const isSaved = savedJobs.includes(job.id);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CompanyLogo
            company={job.company}
            initials={job.initials}
            className="h-14 w-14"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-500">
              {job.company}
            </p>
            <p className="mt-1 text-xs text-slate-400">{job.posted}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {job.featured && (
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700">
              Featured
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleSaved(job.id)}
            aria-label={isSaved ? "Remove saved job" : "Save job"}
            title={isSaved ? "Remove saved job" : "Save job"}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              isSaved
                ? "border-violet-200 bg-violet-50 text-violet-600"
                : "border-slate-200 text-slate-500 hover:border-violet-200 hover:text-violet-600"
            }`}
          >
            <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <Link
          to={`/jobs/${job.id}`}
          className="text-lg font-extrabold tracking-tight text-slate-900 transition hover:text-violet-600"
        >
          {job.title}
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {job.description}
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
          {job.type}
        </span>
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
          {job.experience}
        </span>
      </div>

      <div className="mb-5 space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <MapPin size={17} className="shrink-0 text-violet-500" />
          <span>{job.location}</span>
        </p>

        <p className="flex items-center gap-2">
          <Wallet size={17} className="shrink-0 text-violet-500" />
          <span className="font-bold text-slate-800">{job.salary}</span>
          <span className="text-xs">/ year</span>
        </p>

        <div className="flex items-center justify-between gap-3">
          <p className="flex min-w-0 items-center gap-2">
            <BriefcaseBusiness
              size={16}
              className="shrink-0 text-violet-500"
            />
            <span className="truncate">{job.category}</span>
          </p>

          <p className="flex shrink-0 items-center gap-1 text-xs text-slate-400">
            <Clock3 size={14} />
            {job.posted}
          </p>
        </div>
      </div>

      <Link
        to={`/jobs/${job.id}`}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 px-4 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-600 hover:text-white"
      >
        View Details
        <ArrowUpRight
          size={17}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </article>
  );
}
