import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Showcase from '@components/Showcase'
import styles from '@styles/Layout.module.css'
export default function Layout({ title, keywords, descrripton, children }) {
	const router = useRouter()
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content={keywords} />
				<meta name="description" content={descrripton} />
			</Head>
			<Header />
			{router.pathname === '/' && <Showcase />}
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	)
}

Layout.defaultProps = {
	title: 'DJ Events |Find the hottest parties',
	descrripton: 'Find the hottest parties in the world',
	keywords: 'music, dj, edm, events',
}
