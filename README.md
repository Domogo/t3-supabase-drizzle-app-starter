# T3 stack + Supabase + Drizzle + Shadcn + App directory

This project is Edge ready (Vercel Edge runtime)

This is a starter project/boilerplate to start out with:

- TRPC
- App directory
- Drizzle
- Supabase (Auth, Database, Migrations, Storage)
- Stripe
- Tailwind / Shadcn/UI
- Edge Ready
- Fully set up CI/CD out of the box, all you have to do is add the secrets!
- And many more little life savers!

## What's next? How do I make an app with this?

- Clone this project
- Run

```
pnpm install
```

- Copy the .env.example into .env and fill out the envs

#### If you want to create migrations by hand, go ahead and use this command:

- supabase migration new <_migration_name_>

Then go to supabase/migrations folder and add your SQL there.

## Run these initial commands

- Run the project

```
pnpm dev
```

- Login to supabase CLI

```
supabase login

supabase init
```

- Generate supabase types (from the supabase dir)

```
supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > database.types.ts
```

- Generate drizzle schema
  https://orm.drizzle.team/kit-docs/commands#introspect--pull

```
drizzle-kit introspect
```

If you are not familiar with the different technologies used in this project, please refer to the respective docs.

- [Next.js app router](https://nextjs.org/docs)
- [Drizzle](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Supabase](https://supabase.com/docs)
- [Stripe](https://stripe.com/docs/api)
- [shadcn/ui](https://ui.shadcn.com/)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
