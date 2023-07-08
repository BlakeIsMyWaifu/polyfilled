import '~/styles/fonts.css'
import '~/styles/rehype.css'

import { type AppProps } from 'next/app'
import styled, { ThemeProvider } from 'styled-components'

import ActivityBar from '~/components/ActivityBar'
import Footer from '~/components/Footer'
import Sidebar from '~/components/Sidebar'
import TabBar from '~/components/TabBar'
import { useSettingsStore } from '~/state/useSettingsStore'
import { GlobalStyle } from '~/styles/GlobalStyle'
import { themes } from '~/themes/themes'
import { trpc } from '~/utils/trpc'

const AppContainer = styled.div`
	display: grid;
	grid-template-columns: 48px 256px auto;
	grid-template-rows: 36px auto 24px;
	grid-template-areas: "activity sidebar tabs" "activity sidebar editor" "footer footer footer";
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
`

const App = ({ Component, pageProps }: AppProps) => {

	const theme = useSettingsStore(state => state.theme)

	return (
		<ThemeProvider theme={{ colours: themes[theme].colours }}>
			<AppContainer>
				<ActivityBar />
				<Sidebar />
				<TabBar />
				<Footer />
				<Component {...pageProps} />
			</AppContainer>

			<GlobalStyle />
		</ThemeProvider>
	)
}

export default trpc.withTRPC(App)