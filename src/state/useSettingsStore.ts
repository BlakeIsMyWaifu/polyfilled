import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { type themes } from '~/themes/themes'
import { createActionName, type Slice } from '~/types/storeTypes'

// State

interface SettingsState {
	theme: keyof typeof themes;
}

const settingsState: SettingsState = {
	theme: 'Dark+'
}

// Action

interface SettingsAction {
	setTheme: (theme: SettingsState['theme']) => void;
}

const actionName = createActionName<keyof SettingsAction>('settings')

const createSettingsAction: Slice<SettingsStore, SettingsAction> = set => ({
	setTheme: theme => {
		set({ theme }, ...actionName('setTheme'))
	}
})

// Store

type SettingsStore = SettingsState & SettingsAction

export const useSettingsStore = create<SettingsStore>()(devtools((...a) => ({
	...settingsState,
	...createSettingsAction(...a)
}), { name: 'Settings Store' }))

// Selectors