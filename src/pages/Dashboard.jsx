import { Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  LogOut,
  MapPin,
  UserRound,
} from "lucide-react";
import { jobs } from "../data/jobs";
import { useJobs } from "../context/JobContext";
import JobCard from "../components/JobCard";

export default function Dashboard({ view = "dashboard" }) {
  const {
    user,
    savedJobs,
    applications,
    logout,
    toggleSaved,
  } = useJobs();

  const isSavedPage = view === "saved";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const savedJobList = jobs.filter((job) => savedJobs.includes(job.id));
  const appliedJobs = applications
    .map((application) => ({
      ...application,
      job: jobs.find((job) => job.id === application.jobId),
    }))
    .filter((application) => application.job);

  return (
    <main className="min-h-[70vh] bg-[#fafbfe] py-8 sm:py-12">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#6d4aff]">
              Candidate workspace
            </p>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              {isSavedPage ? "Your saved jobs" : `Hello, ${user.name}!`}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {isSavedPage
                ? "Keep track of the opportunities you want to explore."
                : "Manage your applications and keep your career search organized."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/jobs" className="btn-primary">
              Explore jobs <ArrowRight size={17} />
            </Link>
            {!isSavedPage && (
              <button
                onClick={logout}
                className="btn-secondary"
              >
                <LogOut size={16} /> Sign out
              </button>
            )}
          </div>
        </div>

        {!isSavedPage && (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Saved jobs",
                  value: savedJobs.length,
                  Icon: Bookmark,
                  bg: "bg-violet-50",
                },
                {
                  label: "Applications",
                  value: appliedJobs.length,
                  Icon: BriefcaseBusiness,
                  bg: "bg-sky-50",
                },
                {
                  label: "Profile",
                  value: "Active",
                  Icon: UserRound,
                  bg: "bg-green-50",
                },
              ].map(({ label, value, Icon, bg }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-500">{label}</p>
                    <div className={`rounded-xl p-2.5 ${bg}`}>
                      <Icon size={19} className="text-[#6d4aff]" />
                    </div>
                  </div>
                  <p className="mt-4 font-heading text-3xl font-extrabold">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <section className="mt-9 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 font-heading text-xl font-extrabold text-[#6d4aff]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h2 className="font-heading text-lg font-extrabold">
                    Candidate profile
                  </h2>
                  <p className="mt-1 break-all text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                Your profile is stored locally for this demo. This project does
                not upload your details to an employer or a remote database.
              </p>
            </section>

            <section className="mt-10">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="section-title text-2xl">Application tracker</h2>
                <span className="text-sm text-slate-500">
                  {appliedJobs.length} submitted
                </span>
              </div>

              {appliedJobs.length ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {appliedJobs.map((application) => (
                    <div
                      key={application.jobId}
                      className="flex flex-col gap-4 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-extrabold"
                          style={{
                            backgroundColor: `${application.job.color}15`,
                            color: application.job.color,
                          }}
                        >
                          {application.job.initials}
                        </div>
                        <div className="min-w-0">
                          <Link
                            to={`/jobs/${application.job.id}`}
                            className="font-bold hover:text-[#6d4aff]"
                          >
                            {application.job.title}
                          </Link>
                          <p className="mt-1 text-sm text-slate-500">
                            {application.job.company}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                            <MapPin size={13} /> {application.job.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                          <CheckCircle2 size={14} />
                          {application.status}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                  <BriefcaseBusiness size={30} className="mx-auto text-[#6d4aff]" />
                  <h3 className="mt-4 font-heading text-lg font-extrabold">
                    No applications yet
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Explore jobs and use Apply Now to add a demo application here.
                  </p>
                  <Link to="/jobs" className="btn-primary mt-5">
                    Browse jobs
                  </Link>
                </div>
              )}
            </section>
          </>
        )}

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="section-title text-2xl">
                {isSavedPage ? "Saved opportunities" : "Your saved jobs"}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {savedJobList.length} saved{" "}
                {savedJobList.length === 1 ? "position" : "positions"}
              </p>
            </div>

            {isSavedPage && (
              <Link to="/dashboard" className="btn-secondary">
                Dashboard <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {savedJobList.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {savedJobList.map((job) => (
                <div key={job.id} className="relative">
                  <JobCard job={job} />
                  <button
                    onClick={() => toggleSaved(job.id)}
                    className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700"
                  >
                    <Bookmark size={14} /> Remove from saved jobs
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-[#6d4aff]">
                <Bookmark size={25} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-extrabold">
                No saved jobs yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Save interesting roles with the bookmark icon and find them here.
              </p>
              <Link to="/jobs" className="btn-primary mt-5">
                Find jobs <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        {!isSavedPage && (
          <p className="mt-8 flex items-center gap-2 text-xs leading-5 text-slate-400">
            <Clock3 size={14} />
            Your demo applications and saved jobs persist in this browser.
          </p>
        )}
      </div>
    </main>
  );
}