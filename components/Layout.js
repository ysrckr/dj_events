import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Layout.module.css'
export default function Layout({ title, keywords, descrripton, children }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content={keywords} />
				<meta name="description" content={descrripton} />
			</Head>
			<Header />
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
