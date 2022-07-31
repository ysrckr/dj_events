import Layout from '@components/Layout'
import EventItem from '@components/EventItem'
import { API_URL , PER_PAGE} from '@config/index'

import axios from 'axios'
import { Pagination } from '@components/Pagination'

export default function EventsPage({ events, page, total }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 ? (
				<h3>No event to show</h3>
			) : (
				events.map(event => <EventItem key={event.id} event={event} />)
			)}
			<Pagination page={page} total={total} />
		</Layout>
	)
}

export async function getServerSideProps({ query: { page = 1 } }) {
	// Calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
	// Get Total Count of Events
	const totalRes = await axios.get(`${API_URL}/events/count`)
	const total = totalRes.data
	// Fetch events
	const eventRes = await axios.get(
		`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`,
	)

	const events = await eventRes.data

	return {
		props: {
			events,
			page: +page,
			total,
		},
	}
}
