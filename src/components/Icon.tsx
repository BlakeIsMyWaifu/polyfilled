import Image from 'next/image'
import { useState } from 'react'

const fileIconExtensions: Record<string, string> = {
	md: 'markdown',
	mdx: 'markdown',
	gitignore: 'git',
	eslintrc: 'eslint',
	ico: 'favicon',
	mjs: 'javascript',
	js: 'javascript',
	ts: 'typescript',
	jsx: 'react',
	tsx: 'react',
	env: 'tune',
	webp: 'image',
	ttf: 'font'
}

interface IconProps {
	extensionType: string;
}

const Icon = ({ extensionType }: IconProps) => {

	const [imageSrc, setImageSrc] = useState(fileIconExtensions[extensionType.toLowerCase()] ?? extensionType.toLowerCase())

	return (
		<Image
			src={`/icons/${imageSrc}.webp`}
			onError={() => setImageSrc('json')}
			alt={extensionType}
			width={18}
			height={18}
		/>
	)
}

export default Icon