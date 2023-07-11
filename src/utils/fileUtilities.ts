export const fileExtensionNames: Record<string, string> = {
	md: 'markdown',
	yaml: 'yaml',
	json: 'json',
	gitignore: 'git',
	eslintrc: 'eslint',
	ico: 'favicon',
	mjs: 'next',
	css: 'css',
	js: 'javascript',
	ts: 'typescript',
	jsx: 'react',
	tsx: 'react',

	//? Special cases:

	readme: 'readme',
	package: 'nodejs',
	pnpm: 'pnpm',
	tsconfig: 'tsconfig'
}

export const getFileExtension = (fileName: string) => {
	return fileName.split('.').at(-1)
}

export const getFileExtensionFromPath = (filePath: string) => {
	return filePath.split('/').includes('blog') ? 'md' : 'tsx'
}

export const getFileNameFromPath = (filePath: string) => {
	return filePath.split('/').at(-1) || 'index'
}