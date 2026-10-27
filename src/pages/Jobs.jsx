
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpDown,
  BriefcaseBusiness,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import JobCard from "../components/JobCard";
import { jobs, categories } from "../data/jobs";

const salaryRanges = [
  { label: "Any salary", min: 0 },
  { label: "₹5 LPA+", min: 5 },
  { label: "₹10 LPA+", min: 10 },
  { label: "₹15 LPA+", min: 15 },
  { label: "₹20 LPA+", min: 20 },
];

const experienceOptions = [
  "Any experience",
  "Entry-level",
  "Mid-level",
  "Senior",
];

const typeOptions = [
  "All job types",
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
  "Hybrid",
];

function getSalary(job) {
  const match = job.salary.match(/₹([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );
  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [type, setType] = useState("All job types");
  const [experience, setExperience] = useState("Any experience");
  const [salary, setSalary] = useState("Any salary");
  const [sort, setSort] = useState("recommended");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filteredJobs = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    const place = location.trim().toLowerCase();

    const minimumSalary =
      salaryRanges.find((item) => item.label === salary)?.min || 0;

    let results = jobs.filter((job) => {
      const searchable = [
        job.title,
        job.company,
        job.category,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesKeyword =
        !query || searchable.includes(query);

      const matchesLocation =
        !place || job.location.toLowerCase().includes(place);

      const matchesCategory =
        !category || job.category === category;

      const matchesType =
        type === "All job types" ||
        job.type === type ||
        (type === "Remote" && job.location.toLowerCase().includes("remote"));

      const matchesExperience =
        experience === "Any experience" ||
        job.level === experience;

      const matchesSalary = getSalary(job) >= minimumSalary;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesCategory &&
        matchesType &&
        matchesExperience &&
        matchesSalary
      );
    });

    if (sort === "salary-high") {
      results.sort((a, b) => getSalary(b) - getSalary(a));
    } else if (sort === "salary-low") {
      results.sort((a, b) => getSalary(a) - getSalary(b));
    } else if (sort === "newest") {
      results.sort((a, b) => {
        const order = ["Today", "1 day ago", "2 days ago", "3 days ago"];
        return order.indexOf(a.posted) - order.indexOf(b.posted);
      });
    }

    return results;
  }, [keyword, location, category, type, experience, salary, sort]);

  function submitSearch(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) params.set("q", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    if (category) params.set("category", category);

    setSearchParams(params);
  }

  function resetFilters() {
    setKeyword("");
    setLocation("");
    setCategory("");
    setType("All job types");
    setExperience("Any experience");
    setSalary("Any salary");
    setSort("recommended");
    setSearchParams({});
  }

  const filters = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-extrabold">Filters</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-bold text-[#6d4aff] hover:underline"
        >
          Clear all
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold">Category</label>
        <select
          className="form-control text-sm"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold">Job type</label>
        <select
          className="form-control text-sm"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          {typeOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold">Experience</label>
        <select
          className="form-control text-sm"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        >
          {experienceOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold">Minimum salary</label>
        <select
          className="form-control text-sm"
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
        >
          {salaryRanges.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <main className="min-h-[65vh] bg-[#fafbfe]">
      <section className="bg-[#f7f5ff] py-10 sm:py-14">
        <div className="container-page">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.17em] text-[#6d4aff]">
            Find your next opportunity
          </p>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Explore job openings
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Search roles, compare opportunities, and find your fit.
          </p>

          <form
            onSubmit={submitSearch}
            className="mt-7 grid gap-3 rounded-2xl border border-white bg-white p-3 shadow-sm md:grid-cols-[1fr_1fr_auto]"
          >
            <label className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 px-3">
              <Search size={19} className="shrink-0 text-[#6d4aff]" />
              <input
                className="min-h-12 w-full min-w-0 bg-transparent text-sm outline-none"
                placeholder="Job title, skill or company"
                aria-label="Search by job title, skill or company"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>

            <label className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 px-3">
              <MapPin size={19} className="shrink-0 text-[#6d4aff]" />
              <input
                className="min-h-12 w-full min-w-0 bg-transparent text-sm outline-none"
                placeholder="City or remote"
                aria-label="Search by location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </label>

            <button type="submit" className="btn-primary">
              <Search size={17} /> Search
            </button>
          </form>
        </div>
      </section>

      <div className="container-page py-8 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-extrabold">
              Available positions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredJobs.length} demo{" "}
              {filteredJobs.length === 1 ? "job" : "jobs"} found
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileFilters(!mobileFilters)}
              className="btn-secondary lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
              <ArrowUpDown size={15} className="text-slate-500" />
              <select
                aria-label="Sort jobs"
                className="min-h-11 max-w-[160px] bg-transparent text-xs font-semibold outline-none sm:text-sm"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Recently listed</option>
                <option value="salary-high">Salary: high to low</option>
                <option value="salary-low">Salary: low to high</option>
              </select>
            </label>
          </div>
        </div>

        {mobileFilters && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-bold">Refine your search</span>
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                aria-label="Close filters"
              >
                <X size={19} />
              </button>
            </div>
            {filters}
          </div>
        )}

        <div className="grid items-start gap-7 lg:grid-cols-[245px_1fr]">
          <aside className="sticky top-24 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
            {filters}
          </aside>

          <div>
            {filteredJobs.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                <BriefcaseBusiness
                  size={30}
                  className="mx-auto text-[#6d4aff]"
                />

                <h3 className="mt-4 font-heading text-xl font-extrabold">
                  No matching jobs found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Try a different keyword or remove some filters to explore
                  more opportunities.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-primary mt-5"
                >
                  Clear filters
                </button>
              </div>
            )}

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Demo listings for frontend practice. Verify real vacancies with
              employers before applying.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="text-sm font-bold text-[#6d4aff] hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
