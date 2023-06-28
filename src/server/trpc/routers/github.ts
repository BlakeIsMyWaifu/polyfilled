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
		.query(async () => {
			const response = await fetch('') // TODO figure out how to fetch a dynamic url
			const json = await response.json()
			return json as CommitTrees[]
		})
})