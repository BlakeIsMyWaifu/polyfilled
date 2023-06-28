import { createTRPCRouter } from '~/server/trpc/trpc'

import { githubRouter } from './github'
import { postsRouter } from './posts'

export const appRouter = createTRPCRouter({
	posts: postsRouter,
	github: githubRouter
})

export type AppRouter = typeof appRouter