import { type ReactElement, type ReactNode } from 'react'

import { styleSize } from './mdxComponents'

interface HeaderProps {
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children?: ReactNode;
	id?: string;
}

export const Header = ({ type, children, id }: HeaderProps) => {

	const out: Record<HeaderProps['type'], ReactElement> = {
		h1: <h1 style={styleSize(40, 36, true)} id={id}>{children}</h1>,
		h2: <h2 style={styleSize(40, 32, true)} id={id}>{children}</h2>,
		h3: <h3 style={styleSize(40, 28, true)} id={id}>{children}</h3>,
		h4: <h4 style={styleSize(40, 24, true)} id={id}>{children}</h4>,
		h5: <h5 style={styleSize(20, 18, true)} id={id}>{children}</h5>,
		h6: <h6 style={styleSize(20, 14, true)} id={id}>{children}</h6>
	}

	return out[type]
}

interface Children {
	children: ReactNode;
}

export const Text = ({ children }: Children) => <p style={styleSize(20, 18)}>{children}</p>