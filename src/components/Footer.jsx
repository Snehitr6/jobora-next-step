
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  BriefcaseBusiness,
  Heart,
  Search,
  Bookmark,
} from "lucide-react";

function SocialIcon({ name }) {
  const paths = {
    Facebook: (
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
    ),
    Instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" />
      </>
    ),
    LinkedIn: (
      <>
        <path d="M5 8.5H2V21h3V8.5ZM3.5 3A1.8 1.8 0 1 0 3.5 6.6 1.8 1.8 0 0 0 3.5 3ZM22 13.2c0-3.8-2-5.5-4.7-5.5a4 4 0 0 0-3.6 2V8.5h-3V21h3v-6.2c0-1.7.3-3.4 2.5-3.4s2.2 2 2.2 3.5V21h3.1l.5-7.8Z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="currentColor"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function Footer() {
  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/" },
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "Facebook", url: "https://www.facebook.com/" },
  ];

  return (
    <footer className="border-t border-slate-100 bg-[#fbfaff]">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-16">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo5.svg" alt="Jobora logo" className="h-10 w-10" />
            <span className="font-heading text-2xl font-extrabold tracking-tight">
              jobora<span className="text-[#6d4aff]">.</span>
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
            Find opportunities, discover companies, and take the next step in
            your professional journey.
          </p>

          <div className="mt-5 flex gap-2">
            {socials.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                title={name}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-[#6d4aff]"
              >
                <SocialIcon name={name} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-extrabold">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <Link className="hover:text-[#6d4aff]" to="/jobs">
              Find jobs
            </Link>
            <Link className="hover:text-[#6d4aff]" to="/#categories">
              Job categories
            </Link>
            <Link className="hover:text-[#6d4aff]" to="/#companies">
              Companies
            </Link>
            <Link className="hover:text-[#6d4aff]" to="/#about">
              About Jobora
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-extrabold">
            For candidates
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <Link className="hover:text-[#6d4aff]" to="/signup">
              Create an account
            </Link>
            <Link className="hover:text-[#6d4aff]" to="/saved">
              Saved jobs
            </Link>
            <Link className="hover:text-[#6d4aff]" to="/dashboard">
              My dashboard
            </Link>
            <Link className="hover:text-[#6d4aff]" to="/login">
              Sign in
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-extrabold">
            Stay connected
          </h3>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Ready to discover your next career opportunity?
          </p>

          <Link to="/jobs" className="btn-primary mt-4 w-full">
            Browse opportunities <ArrowRight size={16} />
          </Link>

          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <Mail size={14} />
            Demo website — no real applications sent.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jobora. All rights reserved.</p>
          <p>Built with React, Vite & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
