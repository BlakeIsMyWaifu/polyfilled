import Image from 'next/image'

import { fileExtensionNames } from '~/utils/fileUtilities'
import { trpc } from '~/utils/trpc'

import Tree, { File, type TreeStructure } from '../Tree'

const Commits = () => {

	const commits = trpc.github.commits.useQuery(undefined, {
		staleTime: Infinity
	})

	return commits.isSuccess ? <Tree structure={commits.data.map(commit => {
		const out: TreeStructure[number] = {
			name: commit.commit.message,
			icon: <></>,
			open: false,
			children: <CommitTree sha={commit.sha} />
		}
		return out
	})}/> : null
}

interface CommitTreeProps {
	sha: string;
}

const CommitTree = ({ sha }: CommitTreeProps) => {

	const commitFiles = trpc.github.commitFiles.useQuery(sha, {
		staleTime: Infinity
	})

	const icons: Record<string, string> = {
		'README.md': 'readme',
		'package.json': 'package',
		'pnpm-lock.yaml': 'pnpm',
		'tsconfig.json': 'tsconfig'
	}

	return commitFiles.isSuccess && commitFiles.data.files?.map(({ filename }) => {

		const fileExtension = filename.split('.').at(-1) ?? 'json'
		const icon = fileExtensionNames[icons[filename] ?? fileExtension] ?? 'json'

		return (
			<File
				key={filename}
				name={filename}
				icon={<Image
					src={`/icons/${icon}.webp`}
					alt={'File Extension'}
					width={20}
					height={20}
				/>}
				link={null}
				depth={2}
			/>
		)
	})
}

export default Commits