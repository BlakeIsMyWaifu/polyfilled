import { type Dispatch, type ReactElement, type SetStateAction } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

const AccordionContainer = styled.div`
	color: ${themeDarkPlus.colours.sideBar.accordion.headerText};
`

interface AccordionTitleWrapperProps {
	isTop?: boolean;
	isBottom?: boolean;
}

const AccordionTitleWrapper = styled.span<AccordionTitleWrapperProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	border-top: solid ${props => props.isTop ? 0 : 1}px ${themeDarkPlus.colours.sideBar.accordion.border};
	border-bottom: solid ${props => props.isBottom ? 0 : 1}px ${themeDarkPlus.colours.sideBar.accordion.border};
`

const AccordionTitleText = styled.p``

interface AccordionProps<T extends string> {
	title: T;
	currentAccordion: T | null;
	setCurrentAccordion: Dispatch<SetStateAction<AccordionProps<T>['currentAccordion']>>;
	isTop?: boolean;
	isBottom?: boolean;
	children?: ReactElement | string;
}

const Accordion = <T extends string>({ title, currentAccordion, setCurrentAccordion, isTop, isBottom, children }: AccordionProps<T>) => {

	const isOpen = title === currentAccordion

	return (
		<AccordionContainer>
			<AccordionTitleWrapper
				isTop={isTop}
				isBottom={isBottom}
				onClick={() => setCurrentAccordion(isOpen ? null : title)}
			>
				{isOpen ? <VscChevronDown /> : <VscChevronRight />}
				<AccordionTitleText>{title.toUpperCase()}</AccordionTitleText>
			</AccordionTitleWrapper>
			{isOpen && children}
		</AccordionContainer>
	)
}

export default Accordion