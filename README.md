# Workout Tracker Example

> Based on https://github.com/mwarger/expo-nextjs-dripsy-moti-setup

## Basics

### NextJS

Uses code ripped from the TRPC NextJS starter (https://github.com/trpc/trpc/tree/main/examples/next-prisma-starter)

See \_app.tsx for setup.

### React-Native

TRPC setup using react-query (only addition at this point is superjson transformer)
See App.tsx for this

### React Admin

A basic react-admin (https://marmelab.com/react-admin/) implementation is available at `/admin` - it uses a data-provider to allow react-admin access via TRPC. I don't know if this is a good idea, but it was fun to figure out. It's not typed, because I don't see how it could be... at least not yet.

### NextJS Readme copied below

#### Prisma + tRPC

Try in CodeSandbox: [https://githubbox.com/trpc/trpc/tree/main/examples/next-prisma-starter](https://codesandbox.io/s/github/trpc/trpc/tree/main/examples/next-prisma-starter?file=/src/pages/index.tsx)

#### Features

- 🧙‍♂️ E2E typesafety with [tRPC](https://trpc.io)
- ⚡ Full-stack React with Next.js
- ⚡ Database with Prisma
- ⚙️ VSCode extensions
- 🎨 ESLint + Prettier
- 💚 CI setup using GitHub Actions:
  - ✅ E2E testing with [Playwright](https://playwright.dev/)
  - ✅ Linting

#### Setup

```bash
npx create-next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter
cd trpc-prisma-starter
yarn
yarn dev
```

#### Files of note

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="./prisma/schema.prisma"><code>./prisma/schema.prisma</code></a></td>
      <td>Prisma schema</td>
    </tr>
    <tr>
      <td><a href="./src/api/trpc/[trpc].tsx"><code>./src/api/trpc/[trpc].tsx</code></a></td>
      <td>tRPC response handler</td>
    </tr>
    <tr>
      <td><a href="./src/routers"><code>./src/routers</code></a></td>
      <td>Your app's different tRPC-routers</td>
    </tr>
  </tbody>
</table>

#### Commands

```bash
yarn dx # runs prisma studio + next
yarn build # runs `prisma generate` + `prisma migrate` + `next build`
yarn test-dev # runs e2e tests on dev
yarn test-start # runs e2e tests on `next start` - build required before
yarn dev-nuke # resets local db
```

#### ℹ️ How to switch from SQLite to Postgres

How to switch to postgres

- Remove migrations: `rm -rf ./prisma/migrations`
- Update: `./prisma/schema.prisma` (see commented code)

---

Created by [@alexdotjs](https://twitter.com/alexdotjs).
