/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: '**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string',
			required: true
		},
		date: {
			type: 'date',
			required: true
		},
		authors: {
			type: 'list',
			of: { type: 'string' },
			required: true
		},
		preview: {
			type: 'string'
		},
		draft: {
			type: 'boolean'
		},
		tags: {
			type: 'list',
			of: { type: 'string' }
		},
		categories: {
			type: 'list',
			of: { type: 'string' }
		},
		slug: {
			type: 'string',
			required: true
		}
	},
	computedFields: {
		slug: {
			type: 'string',
			resolve: doc => doc._raw.sourceFileName.replace(/\.mdx/, '')
		}
	}
}))

export default makeSource({
	contentDirPath: 'posts',
	documentTypes: [Post],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: 'github-dark',
					onVisitLine(node) {
						if (node.children.length === 0) {
							node.children = [{ type: 'text', value: ' ' }]
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push('line--highlighted')
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ['Word--highlighted']
					}
				}
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['subheading-anchor'],
						ariaLabel: 'Link to section'
					}
				}
			]
		]
	}
})