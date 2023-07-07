import { z } from 'zod'

import { publicProcedure } from '../procedure'
import { createTRPCRouter } from '../trpc'

const gitDetails = {
	owner: 'BlakeIsMyWaifu',
	repo: 'Polyfilled'
} as const

export const githubRouter = createTRPCRouter({
	commits: publicProcedure
		.query(async ({ ctx }) => {
			const { data } = await ctx.octokit.rest.repos.listCommits(gitDetails)
			return data
		}),
	commitFiles: publicProcedure
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const { data } =  await ctx.octokit.rest.repos.getCommit({
				ref: input,
				...gitDetails
			})
			return data
		})
})