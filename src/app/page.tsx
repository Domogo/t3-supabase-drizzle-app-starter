import AuthButton from "@/components/AuthButton";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <HydrateClient>
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="flex min-h-screen max-w-5xl flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
      </div>

      <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <p>{hello.greeting}</p>
      </footer>
    </HydrateClient>
  );
}
