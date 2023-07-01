import { useMemo } from 'react'
import { BsHash } from 'react-icons/bs'

import { useExplorerStore } from '~/state/useExplorerStore'

import Tree, { type TreeStructure } from '../Tree'

const Outline = () => {

	const outline = useExplorerStore(state => state.outline)

	const treeStructure = useMemo(() => {
		const structure: TreeStructure = []

		outline.forEach(([title, id, _number]) => {
			structure.push({
				name: title,
				icon: <BsHash />,
				link: `#${id}`
			})
		})

		return structure
	}, [outline])

	return <Tree structure={treeStructure}/>
}

export default Outline