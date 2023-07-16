import { type ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import useWindowSize from '~/hooks/useWindowSize'
import { useApplicationStore } from '~/state/useApplicationStore'
import { useSettingsStore } from '~/state/useSettingsStore'
import { themes } from '~/themes/themes'
import { type ThemeType } from '~/types/theme'

interface CustomThemeProviderProps {
	children: ReactNode;
}

const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {

	// The useState / useEffect is needed otherwise styled components has hydration problems
	const theme = useSettingsStore(state => state.theme)
	const [colours, setColours] = useState(themes['Dark+'].colours)
	const [themeType, setThemeType] = useState<ThemeType>('dark')
	useEffect(() => {
		setThemeType(themes[theme].type)
		setColours(themes[theme].colours)
	}, [theme])

	const isMobile = useApplicationStore(state => state.isMobile)
	const setIsMobile = useApplicationStore(state => state.setIsMobile)
	const changeSidebar = useApplicationStore(state => state.changeSidebar)
	const { width } = useWindowSize()
	useEffect(() => {
		const _isMobile = width < 768 && width !== 0
		setIsMobile(_isMobile)
		if (_isMobile) changeSidebar(null)
	}, [changeSidebar, setIsMobile, width])

	return (
		<ThemeProvider theme={{ themeType, colours, isMobile }}>
			{children}
		</ThemeProvider>
	)
}

export default CustomThemeProvider