import Link from 'next/link'
import styled from 'styled-components'

import { useExplorerStore } from '~/state/useExplorerStore'

const OutlineContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 4px;
`

const Anchor = styled(Link)`
	text-decoration: none;
	color: white;
`

const HeaderWrapper = styled.p``

const Outline = () => {

	const outline = useExplorerStore(state => state.outline)

	return <OutlineContainer>
		{
			outline.map(([title, id, number]) => {
				return <Anchor key={id} href={`#${id}`}>
					<HeaderWrapper>
						{'#'.repeat(number)} {title}
					</HeaderWrapper>
				</Anchor>
			})
		}
	</OutlineContainer>
}

export default Outline