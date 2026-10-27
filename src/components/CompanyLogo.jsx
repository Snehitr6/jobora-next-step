import { useState } from "react";

const companyDomains = {
  Google: "google.com",
  Microsoft: "microsoft.com",
  Amazon: "amazon.com",
  Adobe: "adobe.com",
  Spotify: "spotify.com",
  Figma: "figma.com",
};

export default function CompanyLogo({
  company,
  initials,
  className = "",
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const domain = companyDomains[company];

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white ${className}`}
    >
      {domain && !imageFailed ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt={`${company} logo`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className="text-xl font-extrabold text-violet-600">
          {initials || company?.charAt(0) || "J"}
        </span>
      )}
    </div>
  );
}
