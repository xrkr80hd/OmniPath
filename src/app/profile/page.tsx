import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <RoutePlaceholder
        eyebrow="Profile"
        title="Profile hub route for the auth-free test phase."
        summary="Phase 1 uses this screen as an open profile destination so navigation, layout, and eventual page ownership can be tested without authentication."
        status="phase 1 open"
        notes={[
          "This route is open on purpose during the current Docker test phase.",
          "Profile ownership and user-linked data begin in Phase 2.",
          "The route exists now so the navigation map stays stable while backend work is deferred.",
        ]}
        links={[
          { href: "/login", label: "Sign-in route" },
          { href: "/campaigns", label: "Campaign browser" },
        ]}
      />
      <SiteFooter />
    </div>
  );
}
