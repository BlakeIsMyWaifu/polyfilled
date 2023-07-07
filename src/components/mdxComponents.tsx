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

	h1: ({ children }) =>  <Header type='h1'>{children}</Header>,
	h2: ({ children }) =>  <Header type='h2'>{children}</Header>,
	h3: ({ children }) =>  <Header type='h3'>{children}</Header>,
	h4: ({ children }) =>  <Header type='h4'>{children}</Header>,
	h5: ({ children }) =>  <Header type='h5'>{children}</Header>,
	h6: ({ children }) =>  <Header type='h6'>{children}</Header>,

	p: ({ children }) => <Text>{children}</Text>,

	li: ({ children }) => <li style={styleSize(20, 18, true)}>{children}</li>
}

export default mdxComponents