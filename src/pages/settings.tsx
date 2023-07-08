import { type NextPage } from 'next'

import Editor from '~/components/Editor'
import { Header } from '~/components/EditorComponents'
import { useSettingsStore } from '~/state/useSettingsStore'

const Settings: NextPage = () => {

	const setTheme = useSettingsStore(state => state.setTheme)

	return (
		<Editor>
			<Header type='h1'>Settings</Header>

			<button onClick={() => setTheme('Dark+')}>dark</button>
			<button onClick={() => setTheme('Light Modern')}>light</button>
		</Editor>
	)
}

export default Settings