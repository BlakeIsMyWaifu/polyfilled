import { styled } from 'styled-components'

import { useApplicationStore } from '~/state/useApplicationStore'
import themeDarkPlus from '~/themes/darkplus'

import Accordion from './Accordion'

const SidebarContainer = styled.div`
	grid-area: sidebar;
	width: 256px;
	background-color: ${themeDarkPlus.colours.sideBar.background};
`

const SidebarHeader = styled.p`
	color: ${themeDarkPlus.colours.sideBar.headerText};
	padding: 8px 20px;
	font-size: 0.8em;
`

const Sidebar = () => {

	const currentSidebar = useApplicationStore(state => state.currentSidebar)

	return (
		<SidebarContainer>
			<SidebarHeader>{currentSidebar.toUpperCase()}</SidebarHeader>

			<Accordion title='Polyfilled'>
				test text
			</Accordion>
			<Accordion title='Outline'>
				<p>More Text To Test With</p>
			</Accordion>

		</SidebarContainer>
	)
}

export default Sidebar