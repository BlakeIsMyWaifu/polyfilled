type HexColour = `#${string}${string}`

export interface Theme {
	type: 'dark' | 'light';
	colours: {
		activityBar: {
			background: HexColour; // activityBar.background
			iconsActive: HexColour; // activityBar.foreground
			iconsInactive: HexColour; // activityBar.inactiveForeground
		};
		sideBar: {
			background: HexColour; // sideBar.background
			headerText: HexColour; // sideBarTitle.foreground
			accordion: {
				headerText: HexColour;
				contentText: HexColour;
				border: HexColour; // sideBarSectionHeader.border
			};
		};
		tabBar: {
			background: HexColour; // tab.border
			activeTabBackground: HexColour; // tab.activeBackground
			activeTabText: HexColour; // tab.activeForeground
			inactiveTabBackground: HexColour; // tab.inactiveBackground
			inactiveTabText: HexColour; // tab.inactiveForeground
		};
		editor: {
			background: HexColour; // editor.background
			text: HexColour;
			lineNumberText: HexColour; // editorLineNumber.activeForeground
		};
		footer: {
			background: HexColour; // statusBar.background
			hoverBackground: HexColour;
			text: HexColour; // statusBar.foreground
		};
	};
}