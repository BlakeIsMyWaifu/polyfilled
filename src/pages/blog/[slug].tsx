import { allPosts } from 'contentlayer/generated'
import { type GetStaticPathsContext, type InferGetStaticPropsType, type NextPage } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Editor from '~/components/Editor'
import mdxComponents from '~/components/mdxComponents'

type BlogSlugProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogSlug: NextPage<BlogSlugProps> = ({ post }: BlogSlugProps) => {

	const MDXContent = useMDXComponent(post.body.code)

	return (
		<Editor>
			<MDXContent components={mdxComponents} />
		</Editor>
	)
}

interface StaticProps extends GetStaticPathsContext {
	params: {
		slug: string;
	};
}

export const getStaticProps = ({ params: { slug } }: StaticProps) => {
	const post = allPosts.find(post => post._raw.flattenedPath === slug)

	if (!post) return {
		notFound: true
	}

	return {
		props: {
			post
		}
	}
}

export const getStaticPaths = () => {
	const posts = allPosts
		.filter(post => !post.draft)
		.map(post => ({
			params: {
				// TODO fix /en prefixing the path
				slug: post._raw.flattenedPath
			}
		}))

	return {
		paths: posts,
		fallback: false
	}
}

export default BlogSlug