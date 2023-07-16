import { type LooseAutocomplete } from '~/types/looseAutocomplete'

export type ThemeType = 'dark' | 'light'

type HexColour = `#${string}${string}`

type TextColour = LooseAutocomplete<'#ffffff' | '#3b3b3b'> & HexColour

export interface Theme {
	type: ThemeType;
	colours: {
		focusBorder: HexColour; // focusBorder
		text: TextColour;
		activityBar: {
			background: HexColour; // activityBar.background
			iconsActive: HexColour; // activityBar.foreground
			iconsInactive: HexColour; // activityBar.inactiveForeground
		};
		sideBar: {
			background: HexColour; // sideBar.background
			headerText: HexColour; // sideBarTitle.foreground
			accordion: {
				headerText: TextColour;
				contentText: TextColour;
				border: HexColour; // sideBarSectionHeader.border
			};
		};
		tabBar: {
			background: HexColour; // tab.border
			activeTabBackground: HexColour; // tab.activeBackground
			activeTabText: TextColour; // tab.activeForeground
			inactiveTabBackground: HexColour; // tab.inactiveBackground
			inactiveTabText: TextColour; // tab.inactiveForeground
		};
		editor: {
			background: HexColour; // editor.background
			lineNumberText: HexColour; // editorLineNumber.activeForeground
		};
		footer: {
			background: HexColour; // statusBar.background
			hoverBackground: HexColour;
			text: TextColour; // statusBar.foreground
		};
		select: {
			background: HexColour; // settings.dropdownBackground
			border: HexColour; // settings.dropdownBorder
			highlight: HexColour; // list.activeSelectionBackground
		};
		codeblock: {
			background: HexColour;
			border: HexColour;
		};
	};
}