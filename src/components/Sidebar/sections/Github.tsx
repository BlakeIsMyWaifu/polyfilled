import { useState } from 'react'

import Accordion from '../Accordion'

type GithubAccordionTitle =
	| 'pull requests'
	| 'issues'

const Github = () => {

	const [currentAccordion, setCurrentAccordion] = useState<GithubAccordionTitle | null>('pull requests')

	return (
		<>
			<Accordion
				title={'pull requests'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
			<Accordion
				title={'issues'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
		</>
	)
}

export default Github