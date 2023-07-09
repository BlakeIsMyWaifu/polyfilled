import Link from 'next/link'
import { useRouter } from 'next/router'
import { type CSSProperties,useMemo } from 'react'
import { VscGithub, VscLiveShare, VscSourceControl } from 'react-icons/vsc'
import styled from 'styled-components'

const FooterContainer = styled.div`
	grid-area: footer;
	background-color: ${props => props.theme.colours.footer.background};
	display: flex;
	flex-direction: row;
	gap: 12px;
	padding: 0 12px;
`

interface WrapperProps {
	cursor?: CSSProperties['cursor'];
}

const Wrapper = styled.span<WrapperProps>`
	color: ${props => props.theme.colours.footer.text};
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 4px;
	padding: 0 4px;
	&:hover {
		background-color: ${props => props.theme.colours.footer.hoverBackground};
		cursor: ${props => props.cursor};
	}
`

const Text = styled.p`
	height: 20px;
`

const Footer = () => {

	const router = useRouter()

	const sharePath = useMemo(() => `https://${process.env.VERCEL_URL ?? ''}${router.asPath}`, [router.asPath])

	return (
		<FooterContainer>

			<Wrapper>
				<VscSourceControl size={16} />
				<Text>master</Text>
			</Wrapper>

			<Wrapper cursor='pointer' onClick={() => void navigator.clipboard.writeText(sharePath)}>
				<VscLiveShare />
				Share
			</Wrapper>

			<Wrapper cursor='pointer'>
				<Link
					href='https://github.com/BlakeIsMyWaifu/Polyfilled'
					target='_blank'
					rel='noopener noreferrer'
					style={{ all: 'inherit' }}
				>
					<VscGithub />
					Github
				</Link>
			</Wrapper>

		</FooterContainer>
	)
}

export default Footer