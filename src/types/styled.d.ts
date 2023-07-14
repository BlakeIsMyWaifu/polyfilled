import 'styled-components'

import { type Theme } from './theme'

declare module 'styled-components' {
	export interface DefaultTheme {
		colours: Theme['colours'];
		isMobile: boolean;
	}
}