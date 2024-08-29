import { ResetPasswordForm } from "./components/ResetPasswordForm";
import { resetPassword } from "../actions/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <div className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground">
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <ResetPasswordForm
          resetPassword={resetPassword}
          code={searchParams.code}
        />
      </div>
    </div>
  );
}
