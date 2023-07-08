import { type MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { type CSSProperties } from 'react'

import { Header, Text } from './EditorComponents'

const listPadding: CSSProperties = {
	paddingLeft: '36px'
}

export const styleSize = (height: number, font: number, fixHeight = false): CSSProperties => ({
	height: fixHeight ? `${height}px` : undefined,
	lineHeight: `${height}px`,
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

	ul: ({ children }) => <ul style={listPadding}>{children}</ul>,

	ol: ({ children }) => <ol style={listPadding}>{children}</ol>,

	h1: ({ id, children }) => <Header type='h1' id={id}>{children}</Header>,
	h2: ({ id, children }) => <Header type='h2' id={id}>{children}</Header>,
	h3: ({ id, children }) => <Header type='h3' id={id}>{children}</Header>,
	h4: ({ id, children }) => <Header type='h4' id={id}>{children}</Header>,
	h5: ({ id, children }) => <Header type='h5' id={id}>{children}</Header>,
	h6: ({ id, children }) => <Header type='h6' id={id}>{children}</Header>,

	p: ({ children }) => <Text>{children}</Text>,

	li: ({ children }) => <li style={styleSize(20, 18, true)}>{children}</li>
}

export default mdxComponents