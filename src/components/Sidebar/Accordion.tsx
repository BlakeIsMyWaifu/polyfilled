import { type Dispatch, type ReactElement, type SetStateAction } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

const AccordionContainer = styled.div`
	color: ${themeDarkPlus.colours.sideBar.accordion.headerText};
`

const AccordionTitleWrapper = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-top: solid 2px ${themeDarkPlus.colours.sideBar.accordion.border};
	border-bottom: solid 2px ${themeDarkPlus.colours.sideBar.accordion.border};
`

const AccordionTitleText = styled.p``

interface AccordionProps<T extends string> {
	title: T;
	currentAccordion: T | null;
	setCurrentAccordion: Dispatch<SetStateAction<AccordionProps<T>['currentAccordion']>>;
	children?: ReactElement | string;
}

const Accordion = <T extends string>({ title, currentAccordion, setCurrentAccordion, children }: AccordionProps<T>) => {

	const isOpen = title === currentAccordion

	return (
		<AccordionContainer>
			<AccordionTitleWrapper onClick={() => setCurrentAccordion(isOpen ? null : title)}>
				{isOpen ? <VscChevronDown /> : <VscChevronRight />}
				<AccordionTitleText>{title.toUpperCase()}</AccordionTitleText>
			</AccordionTitleWrapper>
			{isOpen && children}
		</AccordionContainer>
	)
}

export default Accordion