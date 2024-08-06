import AuthButton from "@/components/AuthButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileSection } from "./ProfileSection";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="w-full">
        <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
          <div className="flex w-full max-w-5xl items-center justify-between p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex w-full max-w-2xl flex-1 flex-col gap-20 px-3">
        <ProfileSection />
      </div>
    </div>
  );
}
