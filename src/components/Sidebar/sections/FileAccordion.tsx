import Link from 'next/link'
import { useState } from 'react'
import { FcFile, FcFolder, FcOpenedFolder } from 'react-icons/fc'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

const FileAccordionContainer = styled.div`
	padding: 2px 0px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	cursor: pointer;
`

interface FileAccordionWrapperProps {
	depth: number;
}

const LineWrapper = styled.div<FileAccordionWrapperProps>`
	color: ${themeDarkPlus.colours.sideBar.accordion.headerText};
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	&:hover {
		background-color: ${themeDarkPlus.colours.activityBar.background};
	}
	&::before {
		content: "";
		display: block;
		width: ${props => 10 + (props.depth * 8)}px;
		background: ${themeDarkPlus.colours.sideBar.background};
		left: 0;
		top: 0;
	}
`

type FileExtension = 'tsx' | 'md'

interface FileAccordionPropsBase {
	filename: string;
}

interface FileAccordionPropsFolder extends FileAccordionPropsBase {
	childFiles: FileAccordionProps[];
}

 interface FileAccordionPropsFile extends FileAccordionPropsBase {
	fileExtension: FileExtension;
	link: string;
}

type FileAccordionProps = FileAccordionPropsFolder | FileAccordionPropsFile

const isFolder = (props: FileAccordionProps): props is FileAccordionPropsFolder => !(props as FileAccordionPropsFile).fileExtension

const childMap = (childFiles: FileAccordionProps[]): (FolderProps | FileProps)[] => childFiles.map(file => isFolder(file)
	? {
		filename: file.filename,
		depth: 0,
		childFiles: childMap(file.childFiles)
	}
	: {
		filename: file.filename,
		depth: 0,
		fileExtension: file.fileExtension,
		link: file.link
	})

const FileAccordion = (props: FileAccordionProps) => {
	return (
		<FileAccordionContainer>
			{
				isFolder(props)
					? <Folder
						filename={props.filename}
						depth={0}
						childFiles={childMap(props.childFiles)}
					/>
					: <File
						filename={props.filename}
						depth={0}
						fileExtension={props.fileExtension}
						link={props.link}
					/>
			}
		</FileAccordionContainer>
	)
}

interface BaseProps {
	filename: string;
	depth: number;
}

interface FolderProps extends BaseProps {
	childFiles: (FolderProps | FileProps)[];
}

const Folder = ({ filename, depth, childFiles = [] }: FolderProps) => {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<LineWrapper depth={depth} onClick={() => setIsOpen(state => !state)}>
				{
					isOpen
						? <div style={{ height: '16px' }}>
							<VscChevronDown />
							<FcOpenedFolder />
						</div>
						: <div style={{ height: '16px' }}>
							<VscChevronRight />
							<FcFolder />
						</div>
				}
				{filename}
			</LineWrapper>
			{
				isOpen && childFiles.map(file => {
					return isFolder(file)
						? <Folder
							key={file.filename}
							filename={file.filename}
							depth={depth + 1}
							childFiles={file.childFiles}
						/>
						: <File
							key={file.filename}
							filename={file.filename}
							depth={depth + 1}
							fileExtension={file.fileExtension}
							link={file.link}
						/>
				})
			}
		</>
	)
}

interface FileProps extends BaseProps {
	fileExtension: FileExtension;
	link: string;
}

const File = ({ filename, depth, fileExtension, link }: FileProps) => {
	return (
		<LineWrapper depth={depth + 2}>
			<Link href={link} style={{
				all: 'unset'
			}}>
				<FcFile />
				{filename}.{fileExtension}
			</Link>
		</LineWrapper>
	)
}

export default FileAccordion