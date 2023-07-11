import Image from 'next/image'

const fileIconExtensions: Record<string, string> = {
	md: 'markdown',
	gitignore: 'git',
	eslintrc: 'eslint',
	ico: 'favicon',
	mjs: 'next',
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

interface IconProps {
	extensionType: string;
}

const Icon = ({ extensionType }: IconProps) => {
	return (
		<Image
			src={`/icons/${fileIconExtensions[extensionType] ?? extensionType}.webp`}
			alt={extensionType}
			width={16}
			height={16}
		/>
	)
}

export default Icon