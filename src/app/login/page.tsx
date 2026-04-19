import { SimpleShell } from "@/components/omnipath/support/SimpleShell";

export default function LoginPage() {
  return (
    <SimpleShell
      eyebrow="Account"
      title="Account entry stays staged for the later auth phase"
      summary="This route remains simple and on-brand until Supabase-backed auth work is authorized."
    />
  );
}
