import { z } from 'zod'

const server = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']),
	GITHUB_APP_ID: z.coerce.number().int(),
	GITHUB_APP_KEY: z.string().startsWith('-----BEGIN RSA PRIVATE KEY-----'),
	GITHUB_APP_INSTALLATION_ID: z.coerce.number().int()
})

const client = z.object({
})

/** @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>} */
const processEnv = {
	NODE_ENV: process.env.NODE_ENV,
	GITHUB_APP_ID: process.env.GITHUB_APP_ID,
	GITHUB_APP_KEY: process.env.GITHUB_APP_KEY,
	GITHUB_APP_INSTALLATION_ID: process.env.GITHUB_APP_INSTALLATION_ID
}

const merged = server.merge(client)
/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
let env  = process.env

if (!!process.env.SKIP_ENV_VALIDATION == false) {
	const isServer = typeof window === 'undefined'

	const parsed = isServer
		? merged.safeParse(processEnv)
		: client.safeParse(processEnv)

	if (parsed.success === false) {
		console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
		throw new Error('Invalid environment variables')
	}

	/** @type z.infer<merged>
	 *  @ts-ignore - can't type this properly in jsdoc */
	// eslint-disable-next-line no-undef
	env = new Proxy(parsed.data, {
		get(target, prop) {
			if (typeof prop !== 'string') return undefined
			if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
				throw new Error(process.env.NODE_ENV === 'production'
					? '❌ Attempted to access a server-side environment variable on the client'
					: `❌ Attempted to access server-side environment variable '${prop}' on the client`
				)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			/*  @ts-ignore - can't type this properly in jsdoc */
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return target[prop]
		}
	})
}

export { env }