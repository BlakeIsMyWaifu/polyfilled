import { pick } from 'contentlayer/client'
import { allPosts } from 'contentlayer/generated'
import { type InferGetStaticPropsType, type NextPage } from 'next'
import Link from 'next/link'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<HomeProps> = ({ posts }: HomeProps) => {
	return (
		<div>
			{
				posts.map(post => {
					return <Link key={post.slug} href={`en/blog/${post.slug}`}>
						<h2>
							{post.title}
						</h2>
					</Link>
				})
			}
		</div>
	)
}

export const getStaticProps = () => {
	const posts = allPosts.map(post => pick(post, [
		'title',
		'description',
		'date',
		'authors',
		'preview',
		'draft',
		'tags',
		'categories',
		'slug'
	]))

	const publishedPosts = posts.filter(post => post.draft)

	return {
		props: {
			posts: publishedPosts
		}
	}
}

export default Home