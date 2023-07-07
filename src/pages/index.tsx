import { pick } from 'contentlayer/client'
import { allPosts } from 'contentlayer/generated'
import { type InferGetStaticPropsType, type NextPage } from 'next'

import Editor from '~/components/Editor'
import { Header } from '~/components/EditorComponents'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<HomeProps> = ({ posts: _posts }: HomeProps) => {
	return (
		<Editor>
			<Header type='h1'>Polyfilled</Header>
		</Editor>
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
		'slug'
	]))

	const publishedPosts = posts.filter(post => !post.draft)
	const recentPosts = publishedPosts.slice(0, 4)

	return {
		props: {
			posts: recentPosts
		}
	}
}

export default Home