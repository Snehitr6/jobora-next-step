import {
  ArrowRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  Megaphone,
  Palette,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { categories, companies } from "../data/jobs";
import CompanyLogo from "./CompanyLogo";

const categoryIcons = {
  "Software Development": Code2,
  "Data Science": ChartNoAxesCombined,
  "UI/UX Design": Palette,
  Marketing: Megaphone,
  Finance: Wallet,
  "Human Resources": Users,
};

const categoryColors = {
  "Software Development": "bg-violet-100 text-violet-700",
  "Data Science": "bg-sky-100 text-sky-700",
  "UI/UX Design": "bg-pink-100 text-pink-700",
  Marketing: "bg-orange-100 text-orange-700",
  Finance: "bg-emerald-100 text-emerald-700",
  "Human Resources": "bg-amber-100 text-amber-700",
};

export function CategoriesSection() {
  return (
    <section className="w-full py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-violet-600">
              Explore possibilities
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Find your career path
            </h2>

            <p className="mt-3 text-slate-500">
              Discover opportunities across the fields you love.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-800"
          >
            All jobs <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {categories.map((category) => {
            const Icon =
              categoryIcons[category.name] || BriefcaseBusiness;

            return (
              <Link
                key={category.name}
                to={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="group rounded-2xl border border-slate-100 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg sm:p-5"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                    categoryColors[category.name] ||
                    "bg-violet-100 text-violet-700"
                  }`}
                >
                  <Icon size={23} />
                </div>

                <h3 className="text-sm font-bold leading-5 text-slate-900">
                  {category.name}
                </h3>

                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-violet-600">
                  Explore
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CompaniesSection() {
  return (
    <section
      id="companies"
      className="w-full scroll-mt-24 bg-violet-50/60 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-9 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700">
            <Sparkles size={15} />
            Trusted employers
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Companies worth exploring
          </h2>

          <p className="mt-3 text-slate-500">
            Discover teams where your skills can make a difference.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {companies.map((company) => (
            <Link
              key={company.name}
              to={`/jobs?q=${encodeURIComponent(company.name)}`}
              className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <CompanyLogo
                company={company.name}
                initials={company.initials}
                className="mb-4 h-14 w-14"
              />

              <h3 className="text-sm font-bold text-slate-900 transition group-hover:text-violet-600">
                {company.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {company.jobs} demo openings
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "Explore roles across industries.",
    },
    {
      number: "02",
      title: "Compare",
      description: "Review salary and experience.",
    },
    {
      number: "03",
      title: "Save",
      description: "Keep interesting jobs together.",
    },
    {
      number: "04",
      title: "Apply",
      description: "Track demo applications in one place.",
    },
  ];

  return (
    <section id="about" className="w-full py-16 sm:py-20">
      <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <div className="rounded-3xl bg-violet-50 p-6 sm:p-10">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-violet-600">
            Your career, your way
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A simpler way to find your next opportunity.
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Jobora brings job discovery, saved opportunities, and application
            tracking together in one easy-to-use place. Explore roles and
            organize your search at your own pace.
          </p>

          <Link
            to="/jobs"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-700"
          >
            Explore jobs <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="mb-4 text-sm font-extrabold text-violet-600">
                {step.number}
              </p>

              <h3 className="text-base font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
