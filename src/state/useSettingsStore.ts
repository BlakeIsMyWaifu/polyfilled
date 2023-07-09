import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type ThemeName } from '~/themes/themes'
import { createActionName, type DevTools, type Persist, type Slice } from '~/types/storeTypes'

// State

interface SettingsState {
	theme: ThemeName;
}

const settingsState: SettingsState = {
	theme: 'Dark+'
}

// Action

interface SettingsAction {
	setTheme: (theme: SettingsState['theme']) => void;
}

const actionName = createActionName<keyof SettingsAction>('settings')

const createSettingsAction: Slice<SettingsStore, SettingsAction, Middleware> = set => ({
	setTheme: theme => {
		set({ theme }, ...actionName('setTheme'))
	}
})

// Store

type SettingsStore = SettingsState & SettingsAction

type Middleware = [DevTools, Persist]

export const useSettingsStore = create<SettingsStore>()(devtools(persist((...a) => ({
	...settingsState,
	...createSettingsAction(...a)
}), { name: 'polyfilled-settings' }), { name: 'Settings Store' }))

// Selectors