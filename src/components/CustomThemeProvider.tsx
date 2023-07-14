import { type ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import useWindowSize from '~/hooks/useWindowSize'
import { useApplicationStore } from '~/state/useApplicationStore'
import { useSettingsStore } from '~/state/useSettingsStore'
import { themes } from '~/themes/themes'

interface CustomThemeProviderProps {
	children: ReactNode;
}

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {

	// The useState / useEffect is needed otherwise styled components has hydration problems
	const theme = useSettingsStore(state => state.theme)
	const [colours, setColours] = useState(themes['Dark+'].colours)
	useEffect(() => {
		setColours(themes[theme].colours)
	}, [theme])

	const isMobile = useApplicationStore(state => state.isMobile)
	const setIsMobile = useApplicationStore(state => state.setIsMobile)
	const { width } = useWindowSize()
	useEffect(() => {
		setIsMobile(width < 768)
	}, [setIsMobile, width])

	return (
		<ThemeProvider theme={{ colours, isMobile }}>
			{children}
		</ThemeProvider>
	)
}

export default CustomThemeProvider