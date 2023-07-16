import Link from 'next/link'
import { type ReactElement } from 'react'
import { VscFiles, VscSearch, VscSettingsGear, VscSourceControl } from 'react-icons/vsc'
import styled from 'styled-components'

import { type SidebarSection, useApplicationStore } from '~/state/useApplicationStore'

const ActivityBarContainer = styled.div`
	grid-area: activity;
	background-color: ${props => props.theme.colours.activityBar.background};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const ActivityBar = () => {
	return (
		<ActivityBarContainer>
			<div>
				<Icon title='explorer' icon={<VscFiles size='28px' />} />
				<Icon title='search' icon={<VscSearch size='28px' />} />
				<Icon title='sourceControl' icon={<VscSourceControl size='28px' />} />
			</div>
			<div>
				<Link href='/settings'>
					<Icon icon={<VscSettingsGear size='28px' />} />
				</Link>
			</div>
		</ActivityBarContainer>
	)
}

interface IconWrapperProps {
	isActive: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
	position: relative;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.colours.activityBar[props.isActive ? 'iconsActive' : 'iconsInactive']};
	cursor: pointer;
	&:hover {
		color: ${props => props.theme.colours.activityBar.iconsActive};
	}
	&::before {
		content: "";
		display: block;
		width: ${props => props.isActive ? '2px' : '0'};
		height: 48px;
		background: ${props => props.theme.colours.activityBar.iconsActive};
		left: 0;
		top: 0;
		position: absolute;
	}
`

interface IconProps {
	icon: ReactElement;
	title?: SidebarSection;
}

const Icon = ({ icon, title }: IconProps) => {

	const currentSide = useApplicationStore(state => state.currentSidebar)
	const changeSidebar = useApplicationStore(state => state.changeSidebar)

	return (
		<IconWrapper isActive={currentSide === title} onClick={() => title && changeSidebar(currentSide === title ? null : title)}>
			{icon}
		</IconWrapper>
	)
}

export default ActivityBar