import { VscFiles, VscGithub, VscSearch, VscSettingsGear, VscSourceControl } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

const ActivityBarContainer = styled.div`
	grid-area: activity;
	background-color: ${themeDarkPlus.colours.activityBar.background};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const IconGroup = styled.div``

const ActivityBar = () => {
	return (
		<ActivityBarContainer>
			<IconGroup>
				<Icon icon={<VscFiles size='28px' />} />
				<Icon icon={<VscSearch size='28px' />} />
				<Icon icon={<VscSourceControl size='28px' />} />
				<Icon icon={<VscGithub size='28px' />} />
			</IconGroup>
			<IconGroup>
				<Icon icon={<VscSettingsGear size='28px' />} />
			</IconGroup>
		</ActivityBarContainer>
	)
}

const IconWrapper = styled.div`
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${themeDarkPlus.colours.activityBar.iconsInactive};
	cursor: pointer;
	&:hover {
		color: ${themeDarkPlus.colours.activityBar.iconsActive};
	}
`

interface IconProps {
	icon: JSX.Element;
}

const Icon = ({ icon }: IconProps) => {
	return (
		<IconWrapper>
			{icon}
		</IconWrapper>
	)
}

export default ActivityBar