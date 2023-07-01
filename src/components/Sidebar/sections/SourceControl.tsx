import Image from 'next/image'
import { useState } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import { fileExtensionIcons } from '~/utils/fileExtensionIcons'
import { type RouterOutputs, trpc } from '~/utils/trpc'

import Accordion from '../Accordion'
import { LineWrapper } from '../FileAccordion'

type SourceControlAccordionTitle =
	| 'commits'
	| 'pull requests'
	| 'issues'

const CommitAccordionContainer = styled.div``

const MessageWrapper = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`

type Commit = RouterOutputs['github']['commits'][number]

const SourceControl = () => {

	const commits = trpc.github.commits.useQuery(undefined, {
		staleTime: Infinity
	})

	const [currentAccordion, setCurrentAccordion] = useState<SourceControlAccordionTitle | null>('commits')

	return (
		<>
			<Accordion
				isTop
				title={'commits'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			>
				<CommitAccordionContainer>
					{
						commits.isSuccess && commits.data.map(commit => {
							return (
								<Commit
									key={commit.commit.url}
									commit={commit}
								/>
							)
						})
					}
				</CommitAccordionContainer>
			</Accordion>
			<Accordion
				title={'pull requests'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
			<Accordion
				isBottom
				title={'issues'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			/>
		</>
	)
}

interface CommitProps {
	commit: Commit;
}

const Commit = ({ commit }: CommitProps) => {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<LineWrapper depth={0} onClick={() => setIsOpen(state => !state)}>
				<Image
					src={commit.committer?.avatar_url ?? ''}
					alt={`${commit.author?.login ?? ''}'s avatar`}
					width={20}
					height={20}
				/>
				{
					isOpen
						? <div style={{ height: '16px' }}>
							<VscChevronDown />
						</div>
						: <div style={{ height: '16px' }}>
							<VscChevronRight />
						</div>
				}
				<MessageWrapper>{commit.commit.message}</MessageWrapper>
			</LineWrapper>
			{
				isOpen && <CommitTree sha={commit.sha} />
			}
		</>
	)
}

interface CommitTreeProps {
	sha: string;
}

const CommitTree = ({ sha }: CommitTreeProps) => {

	const { data } = trpc.github.commitFiles.useQuery(sha, {
		staleTime: Infinity
	})

	return data?.files?.map(({ filename }) => {

		const fileExtension = filename.split('.').at(-1) ?? 'md'

		let fileIcon = ''

		switch(filename) {
			case 'README.md':
				fileIcon = 'readme'
				break
			case 'package.json':
				fileIcon = 'package'
				break
			case 'pnpm-lock.yaml':
				fileIcon = 'pnpm'
				break
			case 'tsconfig.json':
				fileIcon = 'tsconfig'
				break
			default:
				fileIcon = fileExtension
		}

		return (
			<LineWrapper depth={1} key={filename}>
				<Image
					src={`/icons/${fileExtensionIcons[fileIcon] ?? 'json'}.webp`}
					alt={'File Extension'}
					width={20}
					height={20}
				/>
				<p>{filename}</p>
			</LineWrapper>
		)
	})
}

export default SourceControl