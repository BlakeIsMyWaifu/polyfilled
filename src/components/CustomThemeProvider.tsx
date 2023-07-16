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
	const currentSidebar = useApplicationStore(state => state.currentSidebar)
	const changeSidebar = useApplicationStore(state => state.changeSidebar)
	const { width } = useWindowSize()
	useEffect(() => {
		const _isMobile = width < 768 && width !== 0
		setIsMobile(_isMobile)
		const updatedSidebar = _isMobile ? null : (currentSidebar ?? 'explorer')
		changeSidebar(updatedSidebar)
	// currentSidebar shouldn't be included otherwise you can't open a sidebar on mobile
	// this effect should be broken down at some point
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [changeSidebar, setIsMobile, width])

	return (
		<ThemeProvider theme={{ themeType, colours, isMobile }}>
			{children}
		</ThemeProvider>
	)
}

export default CustomThemeProvider