import { type ReactNode,useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import useWindowSize from '~/hooks/useWindowSize'
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
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	color: white;
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
	min-height: 20px;
	color: ${themeDarkPlus.colours.editor.lineNumberText};
	text-align: right;
	counter-increment: line;
	&::before {
		content: counter(line);
	}
`

interface EditorProps {
	children?: ReactNode;
}

const Editor = ({ children }: EditorProps) => {

	const articleRef = useRef<HTMLElement>(null)
	const [articleHeight, setArticleHeight] = useState(0)

	const currentTab = useApplicationStore(state => state.currentTab)

	const { height } = useWindowSize()

	useEffect(() => {
		if (!articleRef.current) return
		setArticleHeight(articleRef.current.scrollHeight)
	}, [articleRef, currentTab, height])

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
					Array.from({ length: ~~(articleHeight / 20) + (articleHeight > height ? 8 : 0) }).map((_, i) => {
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