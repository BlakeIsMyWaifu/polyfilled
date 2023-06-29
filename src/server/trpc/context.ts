import { createAppAuth } from '@octokit/auth-app'
import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { Octokit } from 'octokit'

import { env } from '~/env.mjs'

interface CreateContextOptions {
	octokit: Octokit;
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
	return {
		octokit: opts.octokit
	}
}

// eslint-disable-next-line @typescript-eslint/require-await
export const createTRPCContext = async (_opts: CreateNextContextOptions) => {

	const octokit = new Octokit({
		authStrategy: createAppAuth,
		auth: {
			appId: env.GITHUB_APP_ID,
			privateKey: env.GITHUB_APP_KEY,
			installationId: env.GITHUB_APP_INSTALLATION_ID
		}
	})

	return createInnerTRPCContext({
		octokit
	})
}

export type Context = inferAsyncReturnType<typeof createInnerTRPCContext>
