import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

const AccordionsContainer = styled.div`
	height: calc(100% - 40px);
	display: flex;
	flex-direction: column;
`

interface AccordionContainerProps {
	isOpen: boolean;
}

const AccordionContainer = styled.div<AccordionContainerProps>`
	color: ${themeDarkPlus.colours.sideBar.accordion.headerText};
	height: ${props => props.isOpen ? 'calc(100% - 40px)' : '20px'};
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

interface AccordionChildrenWrapperProps {
	isOpen: boolean;
}

const AccordionChildrenWrapper = styled.div<AccordionChildrenWrapperProps>`
	display: ${props => props.isOpen ? 'block' : 'none'};
	height: 100%;
	max-height: calc(100% - 20px);
	overflow-y: auto;
	overflow-x: hidden;
`

interface AccordionsProps {
	accordions: {
		name: string;
		children: ReactNode;
	}[];
}

const Accordions = ({ accordions }: AccordionsProps) => {

	const [currentAccordion, setCurrentAccordion] = useState<string | null>(accordions[0].name)

	return (
		<AccordionsContainer>
			{
				accordions.map(({ name, children }, i) => {
					return <Accordion
						key={name}
						title={name}
						currentAccordion={currentAccordion}
						setCurrentAccordion={setCurrentAccordion}
						isTop={!!i}
						isBottom={i === (accordions.length - 1)}
					>
						{children}
					</Accordion>
				})
			}
		</AccordionsContainer>
	)
}

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
				<p>{title.toUpperCase()}</p>
			</AccordionTitleWrapper>

			<AccordionChildrenWrapper isOpen={isOpen}>
				{children}
			</AccordionChildrenWrapper>

		</AccordionContainer>
	)
}

export default Accordions