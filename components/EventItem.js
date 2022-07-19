import Link from 'next/link'
import Image from 'next/image'
import styles from '@styles/EventItem.module.css'

export default function EventItem({ event }) {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						event.image
							? event.image.formats.thumbnail.url
							: '/images/event-default.png'
					}
					alt="alt for now"
					width={170}
					height={100}
				/>
			</div>
			<div className={styles.info}>
				<span>
					{new Date(event.date).toLocaleDateString('tr-TR')} at {event.time}
				</span>
				<h3>{event.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${event.slug}`}>
					<a className="btn">Details</a>
				</Link>
			</div>
		</div>
	)
}
