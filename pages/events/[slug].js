import Layout from '@components/Layout'
import { API_URL } from '@config/index'
import styles from '@styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
export default function SingleEventPage({ event }) {
	const router = useRouter()

	const deleteEvent = async e => {
		if (confirm('Are you sure you want to delete this event?')) {
			const res = await fetch(`${API_URL}/events/${event.id}`, {
				method: 'DELETE',
			})
			const err = await res.statusText

			if (!res.ok) {
				toast.error(err)
			} else {
				router.push('/events')
			}
		}
	}
	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${event.id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href="#" className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Event
					</a>
				</div>
				<span>
					{new Date(event.date).toLocaleDateString('tr-TR')} at {event.time}
				</span>
				<h1>{event.name}</h1>
				<ToastContainer />
				{event.image && (
					<div className={styles.image}>
						<Image
							src={event.image.formats.medium.url}
							alt={event.slug}
							width={960}
							height={600}
						/>
					</div>
				)}
				<h3>Performers: </h3>
				<p>{event.performers}</p>
				<h3>Description: </h3>
				<p>{event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>

				<Link href="/events">
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	)
}
export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/events`)
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
	const res = await fetch(`${API_URL}/events?slug=${slug}`)
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
