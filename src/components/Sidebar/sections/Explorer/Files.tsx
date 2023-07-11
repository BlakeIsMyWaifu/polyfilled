import '~/*/../../public/icons/react.webp'

import { FcFile, FcFolder, FcOpenedFolder } from 'react-icons/fc'

import { trpc } from '~/utils/trpc'

import Tree from '../Tree'

const Files = () => {

	const { data: allPosts } = trpc.posts.getAllPostSlugs.useQuery(undefined, {
		staleTime: Infinity
	})

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
					children: (allPosts ?? []).map(slug => ({
						name: slug,
						icon: <FcFile />,
						link: `/blog/${slug}`
					}))
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