import { allPosts } from 'contentlayer/generated'
import { type GetStaticPathsContext, type InferGetStaticPropsType, type NextPage } from 'next'

type BlogSlugProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogSlug: NextPage<BlogSlugProps> = ({ post }: BlogSlugProps) => {

	return (
		<article dangerouslySetInnerHTML={{ __html: post.body.html }} />
	)
}

interface StaticProps extends GetStaticPathsContext {
	params: {
		slug: string;
	};
}

export const getStaticProps = ({ params: { slug } }: StaticProps) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const post = allPosts.find(post => post._raw.flattenedPath === slug)!

	return {
		props: {
			post
		}
	}
}

export const getStaticPaths = () => {
	const posts = allPosts
		.filter(post => post.draft)
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