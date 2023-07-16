import styled from 'styled-components'

import { useApplicationStore } from '~/state/useApplicationStore'

import Explorer from './sections/Explorer'
import Search from './sections/Search'
import SourceControl from './sections/SourceControl'

interface SidebarContainerProps {
	isOpen: boolean;
}

const SidebarContainer = styled.div<SidebarContainerProps>`
	background-color: ${props => props.theme.colours.sideBar.background};
	display: flex;
	flex-direction: column;
	position: relative;
	min-width: ${props => props.theme.isMobile ? '100%' : '256px'};
	visibility: ${props => props.isOpen ? 'visible' : 'collapse'};
`

const SidebarHeader = styled.p`
	color: ${props => props.theme.colours.sideBar.headerText};
	padding: 10px 20px;
	font-size: 0.8em;
`

interface SectionWrapperProps {
	isActive: boolean;
}

const SectionWrapper = styled.div<SectionWrapperProps>`
	all: inherit;
	visibility: ${props => props.isActive ? 'visible' : 'collapse'};
	position: absolute;
	top: 35px;
	bottom: 0;
`

const Sidebar = () => {

	const currentSidebar = useApplicationStore(state => state.currentSidebar)

	return (
		<SidebarContainer isOpen={!!currentSidebar}>
			<SidebarHeader>{currentSidebar?.toUpperCase()}</SidebarHeader>
			<SectionWrapper isActive={currentSidebar === 'explorer'}>
				<Explorer />
			</SectionWrapper>
			<SectionWrapper isActive={currentSidebar === 'search'}>
				<Search />
			</SectionWrapper>
			<SectionWrapper isActive={currentSidebar === 'sourceControl'}>
				<SourceControl />
			</SectionWrapper>
		</SidebarContainer>
	)
}

export default Sidebar