/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const workoutRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(32),
      description: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      const todo = await ctx.prisma.workout.create({
        data: input,
      })
      return todo
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return ctx.prisma.workout.findMany({
        select: {
          id: true,
          title: true,
          description: true,
        },
      })
    },
  })
  .query('byId', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const workout = await ctx.prisma.workout.findUnique({
        where: { id: input },
      })
      if (!workout) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No workout with id '${input}'`,
        })
      }
      return workout
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        description: z.string().min(1).optional(),
      }),
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input
      const todo = await ctx.prisma.workout.update({
        where: { id },
        data,
      })
      return todo
    },
  })
  // delete
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: id, ctx }) {
      await ctx.prisma.workout.delete({ where: { id } })
      return id
    },
  })
