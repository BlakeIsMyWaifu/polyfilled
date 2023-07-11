import { useMemo } from 'react'

import Icon from '~/components/Icon'
import { useApplicationStore } from '~/state/useApplicationStore'
import { getFileExtensionFromPath, getFileNameFromPath } from '~/utils/fileUtilities'

import Tree, { type TreeStructure } from '../Tree'

const OpenTabs = () => {

	const tabs = useApplicationStore(state => state.tabs)

	const treeStructure = useMemo(() => {
		return tabs.map((tab: string) => {

			const extensionType = getFileExtensionFromPath(tab)

			return {
				name: `${getFileNameFromPath(tab)}.${extensionType}`,
				icon: <Icon extensionType={extensionType} />,
				link: tab
			} satisfies TreeStructure[number]})
	}, [tabs])

	return <Tree structure={treeStructure}/>
}

export default OpenTabs