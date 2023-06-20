import { type ReactElement,useState } from 'react'
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc'
import { styled } from 'styled-components'

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

const AccordionTitleText = styled.p`
`

interface AccordionProps {
	title: string;
	children?: ReactElement | string;
}

const Accordion = ({ title, children }: AccordionProps) => {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<AccordionContainer>
			<AccordionTitleWrapper onClick={() => setIsOpen(state => !state)}>
				{isOpen ? <VscChevronDown/> : <VscChevronUp />}
				<AccordionTitleText>{title.toUpperCase()}</AccordionTitleText>
			</AccordionTitleWrapper>
			{isOpen && children}
		</AccordionContainer>
	)
}

export default Accordion