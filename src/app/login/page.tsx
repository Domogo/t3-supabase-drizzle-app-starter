import Link from "next/link";
import { SignInForm } from "./SignInForm";
import { signIn } from "../actions/auth";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <Link
        href="/"
        className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <div className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground">
        <SignInForm signIn={signIn} />
        <div className="flex items-center gap-2">
          <p>Don&apos;t have an account?</p>
          <Link href="/register" passHref>
            <Button type="button" variant="link" className="p-0 text-blue-500">
              Sign up!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
