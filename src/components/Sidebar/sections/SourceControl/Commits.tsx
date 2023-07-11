import Icon from '~/components/Icon'
import { getFileExtension } from '~/utils/fileUtilities'
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

	return commitFiles.isSuccess && commitFiles.data.files?.map(({ filename }) => {
		return (
			<File
				key={filename}
				name={filename}
				icon={<Icon extensionType={getFileExtension(filename)} />}
				link={null}
				depth={2}
			/>
		)
	})
}

export default Commits