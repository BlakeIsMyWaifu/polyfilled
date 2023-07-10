import { useMemo } from 'react'
import { FcFile } from 'react-icons/fc'

import { useApplicationStore } from '~/state/useApplicationStore'

import Tree, { type TreeStructure } from '../Tree'

const OpenTabs = () => {

	const tabs = useApplicationStore(state => state.tabs)

	const treeStructure = useMemo(() => {
		return tabs.map((tab: string) => ({
			name: tab.replace('/blog/', ''),
			icon: <FcFile />,
			link: tab
		} satisfies TreeStructure[number]))
	}, [tabs])

	return <Tree structure={treeStructure}/>
}

export default OpenTabs