import { z } from 'zod'

import { type Commits } from '~/types/githubCommit'
import { type CommitTrees } from '~/types/githubCommitTree'

import { publicProcedure } from '../procedure'
import { createTRPCRouter } from '../trpc'

export const githubRouter = createTRPCRouter({
	commits: publicProcedure
		.query(async () => {
			const response = await fetch('https://api.github.com/repos/BlakeIsMyWaifu/Polyfilled/commits')
			const json = await response.json()
			return json as Commits[]
		}),
	trees: publicProcedure
		.input(z.array(z.string()))
		.mutation(async ({ input }) => {
			const data = await Promise.all(input.map(async url => fetch(url)))
			const json = await Promise.all(data.map(res => res.json()))
			return json as CommitTrees[]
		})
})