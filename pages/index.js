import Layout from '@components/Layout'
import EventItem from '@components/EventItem'
import { API_URL } from '@config/index'
import Link from 'next/link'
export default function HomePage({ events }) {
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 ? (
				<h3>No event to show</h3>
			) : (
				events.map(event => <EventItem key={event.id} event={event} />)
			)}
			{events.length > 0 && (
				<Link href="/events">
					<a className="btn-secondary"> View All Events</a>
				</Link>
			)}
		</Layout>
	)
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/v1/events`)
	const events = await res.json()

	return {
		props: {
			events: events.slice(0, 3),
		},
		revalidate: 1,
	}
}
