import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const JobContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function JobProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState(() =>
    readStorage("joboraSavedJobs", [])
  );

  const [applications, setApplications] = useState(() =>
    readStorage("joboraApplications", [])
  );

  const [user, setUser] = useState(() =>
    readStorage("joboraUser", null)
  );

  useEffect(() => {
    localStorage.setItem("joboraSavedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem("joboraApplications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("joboraUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("joboraUser");
    }
  }, [user]);

  const toggleSaved = useCallback((id) => {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id]
    );
  }, []);

  const applyToJob = useCallback((id) => {
    let alreadyApplied = false;

    setApplications((previous) => {
      if (previous.some((application) => application.jobId === id)) {
        alreadyApplied = true;
        return previous;
      }

      return [
        {
          jobId: id,
          status: "Application submitted",
          appliedAt: new Date().toISOString(),
        },
        ...previous,
      ];
    });

    return alreadyApplied;
  }, []);

  const login = (email, name = "") => {
    const displayName =
      name.trim() ||
      email.split("@")[0].replace(/[._-]/g, " ");

    setUser({
      name: displayName,
      email,
    });
  };

  const logout = () => setUser(null);

  return (
    <JobContext.Provider
      value={{
        savedJobs,
        applications,
        user,
        toggleSaved,
        applyToJob,
        login,
        logout,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error("useJobs must be used inside JobProvider");
  }

  return context;
}