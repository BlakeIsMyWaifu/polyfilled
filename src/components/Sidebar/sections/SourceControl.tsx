import Image from 'next/image'
import { useState } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'
import { trpc } from '~/utils/trpc'

import Accordion from '../Accordion'
import { LineWrapper } from './FileAccordion'

type SourceControlAccordionTitle =
	| 'commits'
	| 'pull requests'
	| 'issues'

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
				{
					commits.isSuccess && commits.data.map(commit => {

						const commitAuthor: CommitAuthor = {
							name: commit.author.login,
							avatar: commit.author.avatar_url as Avatar
						}

						const commitFiles: File[] = []

						return (
							<CommitAccordion
								key={commit.commit.url}
								message={commit.commit.message}
								author={commitAuthor}
								files={[]}
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

// TODO dunno why this don't work chief
const MessageWrapper = styled.div`
	text-overflow: 'ellipsis';
	white-space: 'nowrap';
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

				})
			}
		</>
	)
}

export default SourceControl