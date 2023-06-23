import { useState } from 'react'
import { FcFolder, FcOpenedFolder } from 'react-icons/fc'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import themeDarkPlus from '~/themes/darkplus'

const FileAccordionContainer = styled.div`
	color: ${themeDarkPlus.colours.sideBar.accordion.headerText};
	padding: 2px 0px;
`

const FileAccordionText = styled.p`
	padding-left: 6px;
`

const FileAccordionTitleWrapper = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const FileAccordionWrapper = styled.div<FileAccordionProps>`
	position: relative;
	display: flex;
	&::before {
		content: "";
		display: block;
		width: ${props => 10 + (props.depth !== undefined ? props.depth * 10 : 0)}px;
		background: ${themeDarkPlus.colours.sideBar.background};
		left: 0;
		top: 0;
	}
`

interface FileAccordionProps {
	filename: string;
	depth?: number;
	isFolder: boolean;
	childFiles?: FileAccordionProps[];
}

const FileAccordion = ({ filename, depth, isFolder, childFiles }: FileAccordionProps) => {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<FileAccordionContainer>
			<FileAccordionWrapper
				filename={filename}
				depth={depth}
				isFolder={isFolder}
				onClick={() => setIsOpen(!isOpen)}
			>
				<FileAccordionTitleWrapper>
					{
						isFolder ?
							isOpen ?
								<>
									<VscChevronDown />
									<FcOpenedFolder />
								</> : <>
									<VscChevronRight />
									<FcFolder />
								</>
							:
							<></>
					}
					<FileAccordionText>{filename}</FileAccordionText>
				</FileAccordionTitleWrapper>
			</FileAccordionWrapper>
			{isOpen ?
				childFiles?.map((file, i) =>
					<FileAccordion
						key={i}
						filename={file.filename}
						depth={file.depth !== undefined ? file.depth + 1 : 1}
						isFolder={file.isFolder}
						childFiles={file.childFiles}
					/>
				) : <></>
			}
		</FileAccordionContainer>
	)
}

export default FileAccordion