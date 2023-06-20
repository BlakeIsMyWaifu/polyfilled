import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createActionName, type Slice } from '~/types/storeTypes'

// State

export type Sidebar =
	| 'explorer'
	| 'search'
	| 'sourceControl'
	| 'github'

interface ApplicationState {
	currentSidebar: Sidebar;
}

const applicationState: ApplicationState = {
	currentSidebar: 'explorer'
}

// Action

interface ApplicationAction {
	changeSidebar: (sidebar: Sidebar) => void;
}

const actionName = createActionName<keyof ApplicationAction>('application')

const createApplicationAction: Slice<ApplicationStore, ApplicationAction> = set => ({
	changeSidebar: sidebar => {
		set({ currentSidebar: sidebar }, ...actionName('changeSidebar'))
	}
})

// Store

type ApplicationStore = ApplicationState & ApplicationAction

export const useApplicationStore = create<ApplicationStore>()(devtools((...a) => ({
	...applicationState,
	...createApplicationAction(...a)
}), { name: 'Application Store' }))

// Selectors