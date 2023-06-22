import { useState } from 'react'

import Accordion from '../Accordion'

type ExplorerAccordionTitle =
	| 'polyfilled'
	| 'outline'
	| 'open editors'

const Explorer = () => {

	const [currentAccordion, setCurrentAccordion] = useState<ExplorerAccordionTitle | null>('polyfilled')

	return (
		<>
			<Accordion
				title='polyfilled'
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
			<Accordion
				title={'outline'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
			<Accordion
				title={'open editors'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
		</>
	)
}

export default Explorer