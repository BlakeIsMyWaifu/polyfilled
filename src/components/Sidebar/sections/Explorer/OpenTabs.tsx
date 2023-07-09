import { useMemo } from 'react'
import { VscFile } from 'react-icons/vsc'

import { useApplicationStore } from '~/state/useApplicationStore'

import Tree, { type TreeStructure } from '../Tree'

const OpenTabs = () => {

	const tabs = useApplicationStore(state => state.tabs)

	const treeStructure = useMemo(() => {
		return tabs.map(tab => ({
			name: tab,
			icon: <VscFile />,
			link: tab
		} satisfies TreeStructure[number]))
	}, [tabs])

	return <Tree structure={treeStructure}/>
}

export default OpenTabs