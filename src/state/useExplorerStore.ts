// State

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createActionName,type Slice } from '~/types/storeTypes'

interface ExplorerState {
	outline: [title: string, id: string, number: number][];
}

const explorerState: ExplorerState = {
	outline: []
}

// Action

interface ExplorerAction {
	setOutline: (outline: ExplorerState['outline']) => void;
}

const actionName = createActionName<keyof ExplorerAction>('explorer')

const createExplorerAction: Slice<ExplorerStore, ExplorerAction> = set => ({
	setOutline: outline => {
		set({ outline }, ...actionName('setOutline'))
	}
})

// Store

type ExplorerStore = ExplorerState & ExplorerAction

export const useExplorerStore = create<ExplorerStore>()(devtools((...a) => ({
	...explorerState,
	...createExplorerAction(...a)
}), { name: 'Explorer Store' }))

// Selectors