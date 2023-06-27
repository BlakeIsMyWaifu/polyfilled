import allPostSlugs from 'cache/allPostSlugs.mjs'

import { createTRPCRouter } from '~/server/trpc/trpc'

import { publicProcedure } from '../procedure'

export const postsRouter = createTRPCRouter({
	getAllPostSlugs: publicProcedure
		.query(() => allPostSlugs)
})