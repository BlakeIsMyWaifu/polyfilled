import { type ReactElement, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { useApplicationStore } from '~/state/useApplicationStore'
import { useExplorerStore } from '~/state/useExplorerStore'
import themeDarkPlus from '~/themes/darkplus'

const EditorContainer = styled.div`
	grid-area: editor;
	background-color: ${themeDarkPlus.colours.editor.background};
	display: flex;
	flex-direction: row;
	overflow-y: scroll;
`

const Article = styled.article`
	width: 100%;
	padding: 32px;
	display: flex;
	flex-direction: column;
	gap: 24px;
	color: white;
	padding-bottom: 48px;
`

interface LineNumberContainer {
	articleHeight: number;
}

const LineNumberContainer = styled.pre<LineNumberContainer>`
	height: ${props => props.articleHeight}px;
	width: min-content;
	counter-reset: none;
	display: flex;
	flex-direction: column;
	padding-left: 8px;
`

const LineNumber = styled.span`
	color: ${themeDarkPlus.colours.editor.lineNumberText};
	text-align: right;
	counter-increment: line;
	&::before {
		content: counter(line);
	}
`

interface EditorProps {
	children?: ReactElement | ReactElement[];
}

const Editor = ({ children }: EditorProps) => {

	const articleRef = useRef<HTMLElement>(null)
	const [articleHeight, setArticleHeight] = useState(0)

	const currentTab = useApplicationStore(state => state.currentTab)

	useEffect(() => {
		if (!articleRef.current) return
		setArticleHeight(articleRef.current.scrollHeight + 48)
	}, [articleRef, currentTab])

	const setOutline = useExplorerStore(state => state.setOutline)

	useEffect(() => {
		if (!articleRef.current) return
		const headers = [...articleRef.current.childNodes].filter(node => node.nodeName.match(/^H[0-9]$/)) as HTMLHeadingElement[]
		const outline = headers.map<[string, string, number]>(header => [header.innerText, header.id, +header.nodeName[1]])
		setOutline(outline)
	}, [currentTab, articleRef, setOutline])

	return (
		<EditorContainer>
			<LineNumberContainer articleHeight={articleHeight}>
				{
					Array.from({ length: ~~(articleHeight / 19) + 1 }).map((_, i) => {
						return <LineNumber key={i} />
					})
				}
			</LineNumberContainer>

			<Article ref={articleRef}>
				{children}
			</Article>
		</EditorContainer>
	)
}

export default Editor