// @ts-check

import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

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
	}
}

export default withBundleAnalyzer(nextConfig)