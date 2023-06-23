import { useState } from 'react'

import Accordion from '../Accordion'
import FileAccordionInner from './FileAccordion'

type ExplorerAccordionTitle =
	| 'polyfilled'
	| 'outline'
	| 'open editors'

const Explorer = () => {

	const [currentAccordion, setCurrentAccordion] = useState<ExplorerAccordionTitle | null>('polyfilled')

	return (
		<div>
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
							childFiles: [
								{
									filename: 'one',
									fileExtension: 'md',
									link: '/en/blog/2023-06-23-first-test-blog'
								},
								{
									filename: 'two',
									fileExtension: 'md',
									link: '/en/blog/2023-06-23-first-test-blog'
								}
							]
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
		</div>
	)
}

export default Explorer