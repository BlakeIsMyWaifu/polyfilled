import { allPosts } from 'contentlayer/generated'

import { createTRPCRouter } from '~/server/trpc/trpc'

import { publicProcedure } from '../procedure'

export const postsRouter = createTRPCRouter({
	getAllPostSlugs: publicProcedure
		.query(() => {
			return allPosts
				.filter(post => !post.draft)
				.map(post => ({
					params: {
						slug: post._raw.flattenedPath
					}
				}))
		})
})