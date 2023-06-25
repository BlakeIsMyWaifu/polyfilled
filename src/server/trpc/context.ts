import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {

}

export const createInnerTRPCContext = (_opts: CreateContextOptions) => {
	return {}
}

// eslint-disable-next-line @typescript-eslint/require-await
export const createTRPCContext = async (_opts: CreateNextContextOptions) => {
	return createInnerTRPCContext({})
}

export type Context = inferAsyncReturnType<typeof createInnerTRPCContext>
