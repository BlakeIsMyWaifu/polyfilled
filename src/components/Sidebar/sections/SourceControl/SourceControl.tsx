import Accordions from '~/components/Sidebar/Accordions'

import Commits from './Commits'

const SourceControl = () => {

	return <Accordions accordions={[
		{
			name: 'commits',
			children: <Commits />
		},
		{
			name: 'pull requests',
			children: null
		},
		{
			name: 'issues',
			children: null
		}
	]}/>
}

export default SourceControl