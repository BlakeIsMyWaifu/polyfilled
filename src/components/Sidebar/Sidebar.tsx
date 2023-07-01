import { type ReactElement } from 'react'
import styled from 'styled-components'

import { type SidebarSection, useApplicationStore } from '~/state/useApplicationStore'
import themeDarkPlus from '~/themes/darkplus'

import Explorer from './sections/Explorer'
import Search from './sections/Search'
import SourceControl from './sections/SourceControl'

const SidebarContainer = styled.div`
	grid-area: sidebar;
	width: 256px;
	max-height: 100vh;
	background-color: ${themeDarkPlus.colours.sideBar.background};
	display: flex;
	flex-direction: column;
`

const SidebarHeader = styled.p`
	color: ${themeDarkPlus.colours.sideBar.headerText};
	padding: 10px 20px;
	font-size: 0.8em;
`

const sections: Record<SidebarSection, ReactElement> = {
	explorer: <Explorer />,
	search: <Search />,
	sourceControl: <SourceControl />
}

const Sidebar = () => {

	const currentSidebar = useApplicationStore(state => state.currentSidebar)

	return (
		<SidebarContainer>
			<SidebarHeader>{currentSidebar.toUpperCase()}</SidebarHeader>
			{sections[currentSidebar]}
		</SidebarContainer>
	)
}

export default Sidebar