const fileExtensionOverrides: Record<string, string> = {
	'.env.example': 'tune',
	'README.md': 'readme',
	'package.json': 'nodejs',
	'pnpm-lock.yaml': 'pnpm',
	'tsconfig.json': 'tsconfig',
	'next.config.mjs': 'next'
}

export const getFileExtension = (fileName: string) => {
	return fileExtensionOverrides[fileName] ?? (fileName.split('.').at(-1) || 'json')
}

export const getFileExtensionFromPath = (filePath: string) => {
	return filePath.split('/').includes('blog') ? 'md' : 'tsx'
}

export const getFileNameFromPath = (filePath: string) => {
	return filePath.split('/').at(-1) || 'index'
}