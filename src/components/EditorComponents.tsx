/* eslint-disable react/jsx-max-props-per-line */
import { forwardRef, type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react'

import useWindowSize from '~/hooks/useWindowSize'

import { styleSize } from './mdxComponents'

interface HeaderProps {
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children?: ReactNode;
	id?: string;
}

const HeaderInner = forwardRef<HTMLHeadingElement, HeaderProps & { height: number }>(function HeaderInner(props, ref) {

	const { type, id, children, height } = props

	const out: Record<HeaderProps['type'], ReactElement> = {
		h1: <h1 style={styleSize(height || 40, 36)} id={id} ref={ref}>{children}</h1>,
		h2: <h2 style={styleSize(height || 40, 32)} id={id} ref={ref}>{children}</h2>,
		h3: <h3 style={styleSize(height || 40, 28)} id={id} ref={ref}>{children}</h3>,
		h4: <h4 style={styleSize(height || 40, 24)} id={id} ref={ref}>{children}</h4>,
		h5: <h5 style={styleSize(height || 20, 18)} id={id} ref={ref}>{children}</h5>,
		h6: <h6 style={styleSize(height || 20, 14)} id={id} ref={ref}>{children}</h6>
	}

	return out[type]
})

export const Header = (props : HeaderProps) => {

	const headerRef = useRef<HTMLHeadingElement>(null)

	const [headerHeight, setHeaderHeight] = useState(0)

	const windowSize = useWindowSize()

	useEffect(() => {
		setHeaderHeight(0)
		if (!headerRef.current) return
		const { scrollHeight } = headerRef.current
		const round = Math.ceil((scrollHeight - 10) / 20) * 20
		setHeaderHeight(round)
	}, [headerRef, windowSize])

	return <HeaderInner ref={headerRef} height={headerHeight} {...props} />
}

interface Children {
	children: ReactNode;
}

export const Text = ({ children }: Children) => <p style={styleSize(20, 18, false)}>{children}</p>