import { type MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { type CSSProperties,type DOMAttributes } from 'react'

import { useSettingsStore } from '~/state/useSettingsStore'
import { themes } from '~/themes/themes'

import { Code, CodeBlockPre, Header, ListItem, Text } from './EditorComponents'

const listStyling: CSSProperties = {
	paddingLeft: '36px'
}

type CodeData<T extends HTMLElement = HTMLElement> = (DOMAttributes<T> & { 'data-language': string; 'data-theme': string })

export const styleSize = (height: number, font: number, fixHeight = true): CSSProperties => ({
	minHeight: fixHeight ? `${height}px` : undefined,
	lineHeight: `${Math.ceil((font - 10) / 20) * 20}px`,
	fontSize: `${font}px`
})

const mdxComponents: MDXComponents = {
	a: ({ href, children }) => {
		return (href ?? '')[0] === '#'
			? <Link href={href ?? ''}>{children}</Link>
			: <Link
				href={href ?? ''}
				target='_blank'
				rel='noopener noreferrer'
			>{children}</Link>
	},

	ul: ({ children }) => <ul style={listStyling}>{children}</ul>,

	ol: ({ children }) => <ol style={listStyling}>{children}</ol>,

	h1: ({ id, children }) => <Header type='h1' id={id}>{children}</Header>,
	h2: ({ id, children }) => <Header type='h2' id={id}>{children}</Header>,
	h3: ({ id, children }) => <Header type='h3' id={id}>{children}</Header>,
	h4: ({ id, children }) => <Header type='h4' id={id}>{children}</Header>,
	h5: ({ id, children }) => <Header type='h5' id={id}>{children}</Header>,
	h6: ({ id, children }) => <Header type='h6' id={id}>{children}</Header>,

	p: ({ children }) => <Text>{children}</Text>,

	li: ({ children }) => <ListItem>{children}</ListItem>,

	code: ({ children, ...data }) => {
		const parsedData = data as CodeData
		return <Code data-language={parsedData['data-language']} data-theme={parsedData['data-theme']}>{children}</Code>
	},
	pre: ({ children, ...data }) => {
		const parsedData = data as CodeData<HTMLPreElement>
		const { theme } = useSettingsStore.getState()
		const themeType = themes[theme].type
		return themeType === parsedData['data-theme']
			? <CodeBlockPre
				data-language={parsedData['data-language']}
				data-theme={parsedData['data-theme']}
			>{children}</CodeBlockPre>
			: null
	}
}

export default mdxComponents