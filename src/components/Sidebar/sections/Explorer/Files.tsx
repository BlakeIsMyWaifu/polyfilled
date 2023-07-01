import { useMemo } from 'react'
import { FcFile, FcFolder, FcOpenedFolder } from 'react-icons/fc'

import { trpc } from '~/utils/trpc'

import Tree from '../Tree'

const Files = () => {

	const { data: allPosts } = trpc.posts.getAllPostSlugs.useQuery(undefined, {
		staleTime: Infinity
	})

	const blogChildFiles = useMemo(() => {
		if (!allPosts) return []
		return allPosts.map(slug => ({
			name: slug,
			icon: <FcFile />,
			link: `/blog/${slug}`
		}) as const)
	}, [allPosts])

	return <Tree structure={[
		{
			name: 'pages',
			icon: <FcOpenedFolder />,
			closedIcon: <FcFolder />,
			open: true,
			children: [
				{
					name: 'blog',
					icon: <FcOpenedFolder />,
					closedIcon: <FcFolder />,
					open: false,
					children: blogChildFiles
				},
				{
					name: 'index.tsx',
					icon: <FcFile />,
					link: '/'
				}
			]
		}
	]}/>
}

export default Files