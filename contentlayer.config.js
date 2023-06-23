import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: '**/*.md',
	contentType: 'markdown',
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
	}, computedFields: { slug: { type: 'string', resolve: doc => doc._raw.sourceFileName.replace(/\.md/, '') } }
}))

export default makeSource({
	contentDirPath: 'posts',
	documentTypes: [Post]
})