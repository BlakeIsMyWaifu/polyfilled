import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

const TabBarContainer = styled.div`
	grid-area: tabs;
	background-color: ${themeDarkPlus.colours.tabBar.background};
`

const TabBar = () => {
	return (
		<TabBarContainer>
			{ }
		</TabBarContainer>
	)
}

export default TabBar