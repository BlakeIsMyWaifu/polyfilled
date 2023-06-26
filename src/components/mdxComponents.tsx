import { type MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { type CSSProperties } from 'react'

const listPadding: CSSProperties = {
	paddingLeft: '36px'
}

const mdxComponents: MDXComponents = {
	a: ({ href, children }) => <Link
		href={href ?? ''}
		target='_blank'
		rel='noopener noreferrer'
	>{children}</Link>,

	ul: ({ children }) => <ul style={listPadding}>{children}</ul>,

	ol: ({ children }) => <ol style={listPadding}>{children}</ol>
}

export default mdxComponents