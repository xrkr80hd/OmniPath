import Link from "next/link";
import type { ReactNode } from "react";

type RoutePlaceholderLink = {
  href: string;
  label: string;
};

type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
  notes: string[];
  links?: RoutePlaceholderLink[];
  children?: ReactNode;
};

export function RoutePlaceholder({
  eyebrow,
  title,
  summary,
  status,
  notes,
  links = [],
  children,
}: RoutePlaceholderProps) {
  return (
    <main className="min-h-[calc(100vh-10rem)] bg-slate-950">
      <section className="omni-shell py-20">
        <div className="omni-card max-w-4xl">
          <p className="omni-kicker">{eyebrow}</p>
          <div className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                {summary}
              </p>
            </div>
            <span className="inline-flex items-center border border-amber-300/30 bg-amber-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
              {status}
            </span>
          </div>

          <div className="grid gap-6 pt-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="space-y-6">
              <div className="rounded-none border border-white/10 bg-white/5 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
                  What is locked right now
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  {notes.map((note) => (
                    <li key={note} className="border-l border-amber-300/30 pl-4">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              {children}
            </div>

            <aside className="space-y-3 rounded-none border border-white/10 bg-slate-900/80 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
                Route links
              </h2>
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-amber-300/30 hover:bg-amber-200/10 hover:text-amber-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
