import Layout from '@components/Layout'
import { API_URL } from '@config/index'
export default function SingleEventPage({ event }) {
	return (
		<Layout>
			.
		</Layout>
	)
}
export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/v1/events`)
	const events = await res.json()

	const paths = events.map(event => ({
		params: { slug: event.slug },
	}))

	return {
		paths,
		fallback: true,
	}
}

export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(`${API_URL}/api/v1/events/${slug}`)
	const events = await res.json()
	return {
		props: {
			event: events[0],
		},
		revalidate: 1,
	}
}

/* export async function getServerSideProps({ query: { slug } }) {
	const res = await fetch(`${API_URL}/api/v1/events/${slug}`)
	const events = await res.json()
	return {
		props: {
			event: events[0],
		},
	}
} */
