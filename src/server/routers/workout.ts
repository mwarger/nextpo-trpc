/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from '../trpc'
import zodToJsonSchema from 'zod-to-json-schema'

export const workoutRouter = createRouter().query('hello', {
  async resolve({ ctx }: any) {
    return { data: 'extra test item' }
  },
})
