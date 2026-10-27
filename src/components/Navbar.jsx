import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useJobs } from "../context/JobContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, savedJobs } = useJobs();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Find Jobs", to: "/jobs" },
    { label: "Companies", to: "/#companies" },
    { label: "About", to: "/#about" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `whitespace-nowrap text-sm font-semibold transition-colors ${
      isActive ? "text-[#6d4aff]" : "text-[#687086] hover:text-[#6d4aff]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="container-page flex h-[74px] items-center justify-between gap-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <img src="/logo5.svg" alt="Jobora logo" className="h-10 w-10" />
          <span className="font-heading text-[25px] font-extrabold tracking-tight text-[#182033]">
            jobora<span className="text-[#6d4aff]">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/saved"
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-violet-50 hover:text-[#6d4aff]"
            aria-label="Saved jobs"
          >
            <Heart size={20} />
            {savedJobs.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6d4aff] px-1 text-[10px] font-bold text-white">
                {savedJobs.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-[#6d4aff]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-24 truncate">{user.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-violet-50"
                  >
                    <LayoutDashboard size={17} /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                      navigate("/");
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={17} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-[#6d4aff]"
              >
                Login
              </Link>
              <Link to="/signup" className="btn-primary !rounded-xl !px-5 !py-3 text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-xl border border-slate-200 p-2.5 text-slate-700 sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-3 sm:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-violet-50 hover:text-[#6d4aff]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/saved"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-violet-50"
            >
              <Heart size={17} /> Saved Jobs ({savedJobs.length})
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-violet-50"
                >
                  <UserRound size={17} /> My Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                    navigate("/");
                  }}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600"
                >
                  <LogOut size={17} /> Sign out
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}