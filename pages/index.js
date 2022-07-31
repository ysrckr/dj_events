import axios from 'axios'
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

export const getServerSideProps = async () => {
	const res = await axios.get(`${API_URL}/events?_sort=date:ASC`)
	const events = res.data
	return {
		props: {
			events,
		},
	}
}
