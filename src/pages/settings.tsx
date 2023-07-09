import { type NextPage } from 'next'

import Editor from '~/components/Editor'
import { Header } from '~/components/EditorComponents'
import Select from '~/components/Select'
import { useSettingsStore } from '~/state/useSettingsStore'
import { type ThemeName, themes } from '~/themes/themes'
import { typedObject } from '~/types/typedObject'

const Settings: NextPage = () => {

	const theme = useSettingsStore(state => state.theme)
	const setTheme = useSettingsStore(state => state.setTheme)

	return (
		<Editor>
			<Header type='h1'>Settings</Header>

			<Select
				label='Colour Theme'
				data={typedObject.keys(themes)}
				/** TODO this doesn't work if loading straight to the settings page */
				defaultValue={theme}
				onChange={event => {
					setTheme(event.target.value as ThemeName)
				}}
			/>
		</Editor>
	)
}

export default Settings