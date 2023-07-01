import { useMemo } from 'react'

import FileAccordionInner from '~/components/Sidebar/sections/FileAccordion'
import { trpc } from '~/utils/trpc'

const Files = () => {

	const { data: allPosts } = trpc.posts.getAllPostSlugs.useQuery(undefined, {
		staleTime: Infinity
	})

	const blogChildFiles = useMemo(() => {
		if (!allPosts) return []
		return allPosts.map(slug => ({
			filename: slug,
			fileExtension: 'md',
			link: `/blog/${slug}`
		}) as const)
	}, [allPosts])

	return <FileAccordionInner
		filename='pages'
		childFiles={[
			{
				filename: 'blog',
				childFiles: blogChildFiles
			},
			{
				filename: 'index',
				fileExtension: 'tsx',
				link: '/'
			}
		]}
	/>
}

export default Files