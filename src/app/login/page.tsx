import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <RoutePlaceholder
        eyebrow="Entry"
        title="Account entry route for the later sign-in phase."
        summary="Phase 1 stays auth-free so the app can be tested cleanly in Docker. This route remains part of the map now so account entry already has a home when Phase 2 begins."
        status="phase 1 open"
        notes={[
          "This screen is intentionally open during the current test phase.",
          "Supabase Auth is still the planned provider for the later auth phase.",
          "No session state or middleware is being simulated here.",
        ]}
        links={[
          { href: "/", label: "Return home" },
          { href: "/campaigns", label: "View campaigns surface" },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
