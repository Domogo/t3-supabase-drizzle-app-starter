import Link from "next/link";
import { signUp } from "../actions/auth";
import { SignUpForm } from "./SignUpForm";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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

      <div className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <SignUpForm signUp={signUp} />
        <div className="flex items-center gap-2">
          <p>Already have an account?</p>
          <Link href="/login" passHref>
            <Button type="button" variant="link" className="p-0 text-blue-500">
              Log in!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
