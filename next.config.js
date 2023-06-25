/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
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

module.exports = withBundleAnalyzer(withContentlayer(nextConfig))