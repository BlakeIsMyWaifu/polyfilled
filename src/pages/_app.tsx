import ActivityBar from '~/components/ActivityBar'
import { GlobalStyle } from '~/styles/GlobalStyle'
import type { AppProps } from 'next/app'
import styled from 'styled-components'

const AppContainer = styled.div`
	display: grid;
	grid-template-columns: 48px 256px auto;
	grid-template-rows: 36px auto;
	grid-template-areas: "activity side tabs" "activity side editor";
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
`

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<AppContainer>
				<ActivityBar />
				<Component {...pageProps} />
			</AppContainer>

			<GlobalStyle />
		</>
	)
}

export default App