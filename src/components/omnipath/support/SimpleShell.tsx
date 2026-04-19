import type { ReactNode } from "react";

export function SimpleShell({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children?: ReactNode;
}) {
  return (
    <main className="omni-shell py-12">
      <p className="omni-kicker">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{summary}</p>
      <div className="mt-8">{children}</div>
    </main>
  );
}
