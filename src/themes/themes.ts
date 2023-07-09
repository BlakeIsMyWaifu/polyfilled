import { type Theme } from '~/types/theme'

import themeDarkPlus from './darkPlus'
import themeLightModern from './lightModern'

export type ThemeName = keyof typeof themes

export const themes = {
	'Dark+': themeDarkPlus,
	'Light Modern': themeLightModern
} as const satisfies Record<string, Theme>