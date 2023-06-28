import Image from 'next/image'
import { useEffect, useState } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import { fileExtensionIcons } from '~/utils/fileExtensionIcons'
import { trpc } from '~/utils/trpc'

import Accordion from '../Accordion'
import { LineWrapper } from './FileAccordion'

type SourceControlAccordionTitle =
	| 'commits'
	| 'pull requests'
	| 'issues'

const SourceControl = () => {

	const commits = trpc.github.commits.useQuery(undefined, {
		staleTime: Infinity,
		onSuccess: data => {
			const fileURLs = data.map(commit => commit.commit.tree.url)
			trees.mutate(fileURLs)
		}
	})

	const trees = trpc.github.trees.useMutation({
		cacheTime: Infinity
	})

	useEffect(() => {
		console.log(trees)
	}, [trees])

	const [currentAccordion, setCurrentAccordion] = useState<SourceControlAccordionTitle | null>('commits')

	return (
		<>
			<Accordion
				isTop
				title={'commits'}
				currentAccordion={currentAccordion}
				setCurrentAccordion={setCurrentAccordion}
			>
				{
					commits.isSuccess && commits.data.map((commit, i) => {

						const commitAuthor: CommitAuthor = {
							name: commit.author.login,
							avatar: commit.author.avatar_url as Avatar
						}
						// TODO: Tree type = tree => there are files further inside that also changed in the commit
						//? The only way to access those files is with another query
						const commitFiles = trees.data?.[i].tree.filter(tree => tree.type === 'blob').map(tree => tree.path)

						return (
							<CommitAccordion
								key={commit.commit.url}
								message={commit.commit.message}
								author={commitAuthor}
								files={commitFiles ?? []}
							/>
						)
					})
				}
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

const CommitAccordionContainer = styled.div`
	
`

type Avatar = `https://avatars.githubusercontent.com/u/${string}`

type CommitAuthor = {
	name: string;
	avatar: Avatar;
}

type File = string;

interface CommitAccordionProps {
	message: string;
	author: CommitAuthor;
	files: File[];
}

const CommitAccordion = ({ message, author, files }: CommitAccordionProps) => {
	return (
		<CommitAccordionContainer>
			<Commit message={message} author={author}
				files={files} />
		</CommitAccordionContainer>
	)
}

interface CommitProps {
	message: string;
	author: CommitAuthor;
	files: File[];
}

const MessageWrapper = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`

const Commit = ({ message, author, files }: CommitProps) => {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<LineWrapper depth={0} onClick={() => setIsOpen(state => !state)}>
				<Image
					src={author.avatar}
					alt={`${author.name}'s avatar`}
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
				<MessageWrapper>{message}</MessageWrapper>
			</LineWrapper>
			{
				isOpen && files.map(file => {

					const fileExtension = file.split('.').at(-1) ?? 'md'

					let fileIcon = ''

					switch(file) {
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
						<LineWrapper depth={1} key={file}>
							<Image
								src={`/icons/${fileExtensionIcons[fileIcon]}.webp`}
								alt={'File Extension'}
								width={20}
								height={20}
							/>
							<p>{file}</p>
						</LineWrapper>
					)
				})
			}
		</>
	)
}

export default SourceControl