import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createActionName, type Slice } from '~/types/storeTypes'

// State

export type SidebarSection =
	| 'explorer'
	| 'search'
	| 'sourceControl'

interface ApplicationState {
	currentSidebar: SidebarSection | null;
	currentTab: string;
	tabs: string[];
	isMobile: boolean;
}

const applicationState: ApplicationState = {
	currentSidebar: 'explorer',
	currentTab: '',
	tabs: [],
	isMobile: false
}

// Action

interface ApplicationAction {
	changeSidebar: (sidebar: ApplicationState['currentSidebar']) => void;
	changeCurrentTab: (tab: string) => void;
	addTab: (tab: string, changeCurrentTab: boolean) => void;
	removeTab: (tab: string) => void;
	setIsMobile: (isMobile: boolean) => void;
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
	},
	setIsMobile: isMobile => {
		set({ isMobile }, ...actionName('setIsMobile'))
	}
})

// Store

type ApplicationStore = ApplicationState & ApplicationAction

export const useApplicationStore = create<ApplicationStore>()(devtools((...a) => ({
	...applicationState,
	...createApplicationAction(...a)
}), { name: 'Application Store' }))

// Selectors