import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html lang='en'>
			<Head />
			<title>Polyfilled</title>
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<link rel='icon' href='/favicon.ico' />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document