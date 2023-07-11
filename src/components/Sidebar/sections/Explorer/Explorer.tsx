import Accordions from '~/components/Sidebar/Accordions'

import Files from './Files'
import OpenTabs from './OpenTabs'
import Outline from './Outline'

const Explorer = () => {
	return  <Accordions accordions={[
		{
			name: 'polyfilled',
			children: <Files />
		},
		{
			name: 'outline',
			children: <Outline />
		},
		{
			name: 'open tabs',
			children: <OpenTabs />
		}
	]} />

}

export default Explorer