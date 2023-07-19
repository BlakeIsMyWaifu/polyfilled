import Icon from '~/components/Icon'
import { trpc } from '~/utils/trpc'

import Tree from '../Tree'

const Files = () => {

	const { data: allPosts } = trpc.posts.getAllPostSlugs.useQuery(undefined, {
		staleTime: Infinity
	})

	return <Tree structure={[
		{
			name: 'pages',
			icon: <Icon extensionType='folder-views-open' />,
			closedIcon: <Icon extensionType='folder-views' />,
			open: true,
			children: [
				{
					name: 'blog',
					icon: <Icon extensionType='folder-markdown-open' />,
					closedIcon: <Icon extensionType='folder-markdown' />,
					open: false,
					children: (allPosts ?? []).map(slug => ({
						name: `${slug}.md`,
						icon: <Icon extensionType='md' />,
						link: `/blog/${slug}`
					}))
				},
				{
					name: 'index.tsx',
					icon: <Icon extensionType='tsx' />,
					link: '/'
				}
			]
		}
	]}/>
}

export default Files