// @ts-check

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'))

import bundleAnalyzer from '@next/bundle-analyzer'
import { createRequire } from 'module'

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

const require = createRequire(import.meta.url)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	},
	swcMinify: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: ''
			}
		]
	}
}

export default withBundleAnalyzer(withContentlayer(nextConfig))