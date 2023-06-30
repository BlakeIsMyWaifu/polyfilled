import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { trpc } from '~/utils/trpc'

import Accordion from '../Accordion'
import FileAccordionInner from './FileAccordion'

const Accordions = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

type ExplorerAccordionTitle =
	| 'polyfilled'
	| 'outline'
	| 'open editors'

const Explorer = () => {

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

	const [currentAccordion, setCurrentAccordion] = useState<ExplorerAccordionTitle | null>('polyfilled')

	return (
		<Accordions>
			<Accordion
				isTop
				title='polyfilled'
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			>
				<FileAccordionInner
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
			</Accordion>
			<Accordion
				title={'outline'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
			<Accordion
				isBottom
				title={'open editors'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
		</Accordions>
	)
}

export default Explorer