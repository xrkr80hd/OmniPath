import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Sign In" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="omni-shell flex items-center justify-between gap-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-slate-50">
          <span className="flex h-10 w-10 items-center justify-center border border-amber-300/40 bg-amber-200/10 text-xs font-bold uppercase tracking-[0.28em] text-amber-100">
            OP
          </span>
          <span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-amber-200/70">
              OmniPath
            </span>
            <span className="block text-sm text-slate-300">
              Campaign platform foundation
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-none border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-amber-300/40 hover:bg-amber-200/10 hover:text-amber-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
