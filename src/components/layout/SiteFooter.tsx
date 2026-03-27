export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="omni-shell flex flex-col gap-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>OmniPath Phase 1 is an auth-free local foundation for route, screen, and interaction testing.</p>
        <p className="font-medium text-slate-300">Phase 2 adds authentication, persistence, and deployment wiring.</p>
      </div>
    </footer>
  );
}
