import '~/styles/fonts.css'
import '~/styles/rehype.css'

import { type AppProps } from 'next/app'
import styled from 'styled-components'

import ActivityBar from '~/components/ActivityBar'
import CustomThemeProvider from '~/components/CustomThemeProvider'
import Footer from '~/components/Footer'
import Sidebar from '~/components/Sidebar'
import TabBar from '~/components/TabBar'
import { useApplicationStore } from '~/state/useApplicationStore'
import { GlobalStyle } from '~/styles/GlobalStyle'
import { trpc } from '~/utils/trpc'

const AppContainer = styled.div`
	display: grid;
	grid-template-columns: 48px auto;
	grid-template-rows: auto 24px;
	grid-template-areas: "activity main" "footer footer";
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
`

const HorizontalContainer = styled.div`
	grid-area: main;
	display: flex;
	flex-direction: row;
	max-width: calc(100vw - 48px);
`

interface VerticalContainerProps {
	sidebarIsOpen: boolean;
}

const VerticalContainer = styled.div<VerticalContainerProps>`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	visibility: ${props => props.theme.isMobile && props.sidebarIsOpen ? 'collapse' : 'visible'};
`

const App = ({ Component, pageProps }: AppProps) => {

	const currentSidebar = useApplicationStore(state => state.currentSidebar)

	return (
		<CustomThemeProvider>

			<AppContainer>
				<ActivityBar />
				<Footer />
				<HorizontalContainer>
					<Sidebar />
					<VerticalContainer sidebarIsOpen={!!currentSidebar}>
						<TabBar />
						<Component {...pageProps} />
					</VerticalContainer>
				</HorizontalContainer>
			</AppContainer>

			<GlobalStyle />

		</CustomThemeProvider>
	)
}

export default trpc.withTRPC(App)