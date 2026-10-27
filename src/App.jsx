import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { JobProvider } from "./context/JobContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);

      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      <ScrollToTop />

      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/saved" element={<Dashboard view="saved" />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="*"
          element={
            <main className="container-page py-24 text-center">
              <p className="font-heading text-6xl font-extrabold text-[#6d4aff]">
                404
              </p>
              <h1 className="mt-4 font-heading text-2xl font-extrabold">
                Page not found
              </h1>
              <p className="mt-2 text-slate-500">
                The page you're looking for doesn't exist.
              </p>
              <a href="/" className="btn-primary mt-6">
                Back to home
              </a>
            </main>
          }
        />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <JobProvider>
        <AppLayout />
      </JobProvider>
    </BrowserRouter>
  );
}