import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { jobs } from "../data/jobs";
import { useJobs } from "../context/JobContext";
import JobCard from "../components/JobCard";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((item) => item.id === Number(id));
  const { user, savedJobs, toggleSaved, applications, applyToJob } = useJobs();
  const [message, setMessage] = useState("");

  if (!job) {
    return (
      <main className="container-page py-24 text-center">
        <h1 className="font-heading text-3xl font-extrabold">Job not found</h1>
        <p className="mt-3 text-slate-500">
          This listing may have been removed or the URL may be incorrect.
        </p>
        <Link to="/jobs" className="btn-primary mt-6">
          Browse jobs
        </Link>
      </main>
    );
  }

  const isSaved = savedJobs.includes(job.id);
  const applied = applications.some((item) => item.jobId === job.id);

  function handleApply() {
    if (!user) {
      navigate("/login", { state: { from: `/jobs/${job.id}` } });
      return;
    }

    const alreadyApplied = applyToJob(job.id);
    setMessage(
      alreadyApplied
        ? "You have already applied for this demo job."
        : "Your demo application has been recorded successfully."
    );
  }

  const relatedJobs = jobs
    .filter((item) => item.category === job.category && item.id !== job.id)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-[#fafbfe] py-7 sm:py-10">
      <div className="container-page">
        <Link
          to="/jobs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#6d4aff]"
        >
          <ArrowLeft size={17} /> Back to jobs
        </Link>

        <div className="grid items-start gap-7 lg:grid-cols-[1fr_330px]">
          <div>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl font-extrabold"
                  style={{
                    backgroundColor: `${job.color}15`,
                    color: job.color,
                  }}
                >
                  {job.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2">
                    {job.featured && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                        Featured
                      </span>
                    )}
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      Demo listing
                    </span>
                  </div>

                  <h1 className="mt-3 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {job.title}
                  </h1>

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    {job.company}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={16} /> {job.posted}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSaved(job.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    isSaved
                      ? "border-violet-200 bg-violet-50 text-[#6d4aff]"
                      : "border-slate-200 hover:border-violet-200 hover:text-[#6d4aff]"
                  }`}
                >
                  <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
                  {isSaved ? "Saved" : "Save job"}
                </button>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                {[
                  { Icon: Wallet, label: "Salary", value: job.salary },
                  { Icon: BriefcaseBusiness, label: "Experience", value: job.experience },
                  { Icon: Clock3, label: "Employment", value: job.type },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-3.5 sm:p-4">
                    <Icon size={19} className="text-[#6d4aff]" />
                    <p className="mt-3 text-xs text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-extrabold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="font-heading text-xl font-extrabold">
                  About this role
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {job.description}
                </p>
              </div>

              <div className="mt-8">
                <h2 className="font-heading text-xl font-extrabold">
                  Responsibilities
                </h2>
                <ul className="mt-4 space-y-3">
                  {job.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                    >
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#6d4aff]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="font-heading text-xl font-extrabold">
                  Skills and qualifications
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-violet-100 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                <ShieldCheck size={19} className="mb-2" />
                <p className="font-bold">Demo job information</p>
                <p className="mt-1">
                  This is mock content for your website project, not a verified vacancy. Applications are stored locally in your browser.
                </p>
              </div>
            </section>

            {relatedJobs.length > 0 && (
              <section className="mt-9">
                <h2 className="section-title mb-5">Related opportunities</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedJobs.map((item) => (
                    <JobCard key={item.id} job={item} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
            <p className="text-sm text-slate-500">Estimated annual salary</p>
            <p className="mt-2 font-heading text-2xl font-extrabold">
              {job.salary}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Employer-provided salary is not verified in this demo.
            </p>

            <button
              onClick={handleApply}
              disabled={applied}
              className={`mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                applied
                  ? "cursor-default bg-green-50 text-green-700"
                  : "btn-primary"
              }`}
            >
              {applied ? (
                <>
                  <CheckCircle2 size={17} /> Applied
                </>
              ) : (
                <>
                  Apply Now <ArrowUpRight size={17} />
                </>
              )}
            </button>

            {message && (
              <p
                role="status"
                className="mt-3 rounded-xl bg-green-50 p-3 text-sm leading-5 text-green-800"
              >
                {message}
              </p>
            )}

            <button
              onClick={() => toggleSaved(job.id)}
              className="btn-secondary mt-3 w-full"
            >
              <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? "Remove Saved Job" : "Save for Later"}
            </button>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="font-heading font-extrabold">Job overview</h3>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Company</p>
                  <p className="mt-1 font-bold">{job.company}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="mt-1 font-bold">{job.category}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Experience level</p>
                  <p className="mt-1 font-bold">{job.level}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Work arrangement</p>
                  <p className="mt-1 font-bold">{job.type}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}