import { useState } from 'react'

import Accordion from '../../Accordion'
import Commits from './Commits'

type SourceControlAccordionTitle =
	| 'commits'
	| 'pull requests'
	| 'issues'

const SourceControl = () => {

	const [currentAccordion, setCurrentAccordion] = useState<SourceControlAccordionTitle | null>('commits')

	return (
		<>
			<Accordion
				isTop
				title={'commits'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			>
				<Commits />
			</Accordion>
			<Accordion
				title={'pull requests'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
			<Accordion
				isBottom
				title={'issues'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
		</>
	)
}

export default SourceControl