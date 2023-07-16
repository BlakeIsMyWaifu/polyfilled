import 'styled-components'

import { type Theme,type ThemeType } from './theme'

declare module 'styled-components' {
	export interface DefaultTheme {
		themeType: ThemeType;
		colours: Theme['colours'];
		isMobile: boolean;
	}
}