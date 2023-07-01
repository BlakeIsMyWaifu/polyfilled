import Link from 'next/link'
import { type ReactElement } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'

import useToggle from '~/hooks/useToggle'
import themeDarkPlus from '~/themes/darkplus'

const TreeContainer = styled.div`
	padding: 2px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	cursor: pointer;
`

interface LineWrapperProps {
	depth: number;
}

const LineWrapper = styled.div<LineWrapperProps>`
	color: ${themeDarkPlus.colours.sideBar.accordion.headerText};
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	padding-left: ${props => props.depth * 16}px;
	&:hover {
		background-color: ${themeDarkPlus.colours.activityBar.background};
	}
`

interface BranchBase {
	name: string;
	icon: ReactElement;
}

interface FolderBranch extends BranchBase {
	open: boolean;
	closedIcon?: ReactElement;
	children: TreeStructure;
}

interface FileBranch extends BranchBase {
	link: string | null;
}

interface BranchProps {
	depth: number;
}

type Branch = FolderBranch | FileBranch

export type TreeStructure = Branch[]

interface TreeProps {
	structure: TreeStructure;
}

const isFolder = (branch: Branch): branch is FolderBranch => Object.hasOwn(branch, 'children')

const Tree = ({ structure }: TreeProps) => {
	return (
		<TreeContainer>
			{
				structure.map(branch => {
					return isFolder(branch)
						? <Folder
							key={branch.name}
							depth={0}
							{...branch}
						/>
						: <File
							key={branch.name}
							depth={0}
							{...branch}
						/>
				})
			}
		</TreeContainer>
	)
}

type FolderProps = FolderBranch & BranchProps

const Folder = ({ name, icon, open, children, depth, closedIcon }: FolderProps) => {

	const [isOpen, toggle] = useToggle(open)

	return (
		<>
			<LineWrapper depth={depth} onClick={toggle}>
				{
					isOpen
						? <div style={{ height: '16px' }}>
							<VscChevronDown />
							{icon}
						</div>
						: <div style={{ height: '16px' }}>
							<VscChevronRight />
							{closedIcon ?? icon}
						</div>
				}
				{name}
			</LineWrapper>
			{
				isOpen && children.map(branch => {
					return isFolder(branch)
						? <Folder
							key={branch.name}
							depth={depth + 1}
							{...branch}
						/>
						: <File
							key={branch.name}
							depth={depth + 1}
							{...branch}
						/>
				})
			}
		</>
	)
}

type FileProps = FileBranch & BranchProps

const File = ({ name, icon, link, depth }: FileProps) => {

	const inner = <>
		{icon}
		{name}
	</>

	return (
		<LineWrapper depth={depth}>
			{
				link
					? <Link href={link} style={{
						all: 'unset'
					}}>
						{inner}
					</Link>
					: inner
			}
		</LineWrapper>
	)
}

export default Tree