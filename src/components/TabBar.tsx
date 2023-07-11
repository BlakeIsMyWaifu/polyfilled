import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import styled from 'styled-components'

import { useApplicationStore } from '~/state/useApplicationStore'
import { getFileExtensionFromPath, getFileNameFromPath } from '~/utils/fileUtilities'

import Icon from './Icon'

const TabBarContainer = styled.div`
	grid-area: tabs;
	background-color: ${props => props.theme.colours.tabBar.background};
	display: flex;
	flex-direction: row;
`

interface TabContainerProps {
	isActive: boolean;
}

const TabContainer = styled.div<TabContainerProps>`
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 2px;
	padding: 0 1em;
	background-color: ${props => props.theme.colours.tabBar[props.isActive ? 'activeTabBackground' : 'inactiveTabBackground']};
	color: ${props => props.theme.colours.tabBar[props.isActive ? 'activeTabText' : 'inactiveTabText']};
	cursor: pointer;
`

const TabCloseWrapper = styled.span`
	height: 20px;
	aspect-ratio: 1 / 1;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: ${props => props.theme.colours.tabBar.inactiveTabBackground};
	}
`

const TabBar = () => {

	const router = useRouter()

	const currentTab = useApplicationStore(state => state.currentTab)
	const tabs = useApplicationStore(state => state.tabs)
	const addTab = useApplicationStore(state => state.addTab)
	const removeTab = useApplicationStore(state => state.removeTab)

	useEffect(() => {
		const path = router.asPath.split('#')[0]
		addTab(path, true)
	}, [addTab, router.asPath])

	const handleCloseTab = (tab: string) => {
		if (tab === '/' && !(tabs.length - 1)) return
		removeTab(tab)
		const newRoute = (tabs.find(t => t !== tab) ?? '/')
		void router.push(newRoute)
	}

	return (
		<TabBarContainer>
			{
				tabs.map(tab => {
					const tabName = getFileNameFromPath(tab)
					const isActive = tab === currentTab
					const fileExtension = getFileExtensionFromPath(tab)
					return <TabContainer
						key={tab}
						isActive={isActive}
						onMouseDown={event => {
							if (event.button === 1) {
								handleCloseTab(tab)
							} else {
								if (isActive) return
								void router.push(`${tab}`)
							}
						}}
					>
						<Icon extensionType={fileExtension} />
						<p>{tabName}.{fileExtension}</p>
						{
							isActive && <TabCloseWrapper onClick={() => handleCloseTab(tab)}>
								<VscChromeClose />
							</TabCloseWrapper>
						}
					</TabContainer>
				})
			}
		</TabBarContainer>
	)
}

export default TabBar