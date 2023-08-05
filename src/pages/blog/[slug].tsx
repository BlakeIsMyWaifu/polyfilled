import { allPosts } from 'contentlayer/generated'
import { type GetStaticPathsContext, type InferGetStaticPropsType, type NextPage } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Editor from '~/components/Editor'
import { Header } from '~/components/EditorComponents'
import mdxComponents from '~/components/mdxComponents'

type BlogSlugProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogSlug: NextPage<BlogSlugProps> = ({ post }: BlogSlugProps) => {

	const MDXContent = useMDXComponent(post.body.code)

	return (
		<Editor>
			<Header type='h1'>{post.title}</Header>

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
	const post = allPosts.find(post => post.slug === slug)

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
				slug: post.slug
			}
		}))

	return {
		paths: posts,
		fallback: false
	}
}

export default BlogSlug