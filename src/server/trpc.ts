import { PrismaClient } from '@prisma/client'
import * as trpc from '@trpc/server'
import { inferProcedureInput, inferProcedureOutput } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { AppRouter } from './routers/app'

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
})
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  // for API-response caching see https://trpc.io/docs/caching

  return {
    req,
    res,
    prisma,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>

export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>

export type inferQueryInput<
  TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter['_def']['mutations'],
> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>

export type inferMutationInput<
  TRouteKey extends keyof AppRouter['_def']['mutations'],
> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>()
}
