import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createActionName, type Slice } from '~/types/storeTypes'

// State

export type SidebarSection =
	| 'explorer'
	| 'search'
	| 'sourceControl'

interface ApplicationState {
	currentSidebar: SidebarSection;
	currentTab: string;
	tabs: string[];
}

const applicationState: ApplicationState = {
	currentSidebar: 'explorer',
	currentTab: '',
	tabs: []
}

// Action

interface ApplicationAction {
	changeSidebar: (sidebar: SidebarSection) => void;
	changeCurrentTab: (tab: string) => void;
	addTab: (tab: string, changeCurrentTab: boolean) => void;
	removeTab: (tab: string) => void;
}

const actionName = createActionName<keyof ApplicationAction>('application')

const createApplicationAction: Slice<ApplicationStore, ApplicationAction> = (set, get) => ({
	changeSidebar: sidebar => {
		set({ currentSidebar: sidebar }, ...actionName('changeSidebar'))
	},
	changeCurrentTab: tab => {
		set({ currentTab: tab }, ...actionName('changeCurrentTab'))
	},
	addTab: (newTab, changeCurrentTab) => {
		const { tabs } = get()
		if (!tabs.includes(newTab)) {
			const cloneTabs = structuredClone(tabs)
			cloneTabs.unshift(newTab)
			set({ tabs: cloneTabs }, ...actionName('addTab'))
		}
		if (changeCurrentTab) {
			get().changeCurrentTab(newTab)
		}
	},
	removeTab: tab => {
		set(state => ({
			tabs: state.tabs.filter(t => t !== tab)
		}), ...actionName('removeTab'))
	}
})

// Store

type ApplicationStore = ApplicationState & ApplicationAction

export const useApplicationStore = create<ApplicationStore>()(devtools((...a) => ({
	...applicationState,
	...createApplicationAction(...a)
}), { name: 'Application Store' }))

// Selectors