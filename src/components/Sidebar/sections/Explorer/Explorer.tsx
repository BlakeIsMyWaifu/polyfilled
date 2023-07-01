import Accordions from '~/components/Sidebar/Accordions'

import Files from './Files'
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
			name: 'open editors',
			children: null
		}
	]} />

}

export default Explorer