import { site } from "@/data/site";

const profiles = [
  {
    name: "LinkedIn",
    href: site.linkedin,
    icon: <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.99 0 3.58 1.97 3.58 4.53v5.25Z" />,
  },
  {
    name: "Instagram",
    href: site.instagram,
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" /></>,
  },
  {
    name: "Facebook",
    href: site.facebook,
    icon: <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />,
  },
];

export default function SocialLinks({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Follow Saur on social media">
      {profiles.map((profile) => (
        <a
          key={profile.name}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Saur Engineering and Consultancy on ${profile.name} (opens in a new tab)`}
          className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF8A00] ${
            dark
              ? "border-white/20 text-white/80 hover:border-[#FF8A00] hover:text-[#FF8A00]"
              : "border-slate-200 text-[#0b233a] hover:border-[#FF8A00] hover:text-[#b85e00]"
          }`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">{profile.icon}</svg>
          <span>{profile.name}</span>
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
