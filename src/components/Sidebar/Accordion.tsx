import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

interface AccordionContainerProps {
	isOpen: boolean;
}

const AccordionContainer = styled.div<AccordionContainerProps>`
	color: ${themeDarkPlus.colours.sideBar.accordion.headerText};
	height: ${props => props.isOpen ? '100%' : '20px'};
	transition: height 0.2s ease-in;
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

interface AccordionChildrenWrapperProps {
	isOpen: boolean;
}

const AccordionChildrenWrapper = styled.div<AccordionChildrenWrapperProps>`
	display: ${props => props.isOpen ? 'block' : 'none'};
`

interface AccordionProps<T extends string> {
	title: T;
	currentAccordion: T | null;
	setCurrentAccordion: Dispatch<SetStateAction<AccordionProps<T>['currentAccordion']>>;
	isTop?: boolean;
	isBottom?: boolean;
	children?: ReactNode;
}

const Accordion = <T extends string>({ title, currentAccordion, setCurrentAccordion, isTop, isBottom, children }: AccordionProps<T>) => {

	const isOpen = title === currentAccordion

	return (
		<AccordionContainer isOpen={isOpen}>

			<AccordionTitleWrapper
				isTop={isTop}
				isBottom={isBottom}
				onClick={() => setCurrentAccordion(isOpen ? null : title)}
			>
				{isOpen ? <VscChevronDown /> : <VscChevronRight />}
				<AccordionTitleText>{title.toUpperCase()}</AccordionTitleText>
			</AccordionTitleWrapper>

			<AccordionChildrenWrapper isOpen={isOpen}>
				{children}
			</AccordionChildrenWrapper>

		</AccordionContainer>
	)
}

export default Accordion