import { useState } from 'react'
import styled from 'styled-components'

import Accordion from '~/components/Sidebar/Accordion'

import Files from './Files'
import Outline from './Outline'

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

	const [currentAccordion, setCurrentAccordion] = useState<ExplorerAccordionTitle | null>('polyfilled')

	return (
		<Accordions>
			<Accordion
				isTop
				title='polyfilled'
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			>
				<Files />
			</Accordion>
			<Accordion
				title={'outline'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			>
				<Outline />
			</Accordion>
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