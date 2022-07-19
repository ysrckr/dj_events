import Layout from '@components/Layout'
import Modal from '@components/Modal'
import ImageUpload from '@components/ImageUpload'

import { FaImage } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@config/index'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@styles/Form.module.css'
import moment from 'moment'

//Begin Edit Page
export default function EditEventPage({ event }) {
	//Destructer Event
	const {
		name,
		performers,
		venue,
		address,
		date,
		time,
		description,
		id,
		image,
		slug,
	} = event
	//Init State
	const [values, setValues] = useState({
		name,
		performers,
		venue,
		address,
		date,
		time,
		description,
	})
	//Image Preview State
	const [imagePreview, setImagePreview] = useState(
		image ? image.formats.thumbnail.url : null
	)

	//Show Modal State
	const [showModal, setShowModal] = useState(false)
	//Init Router
	const router = useRouter()

	//Submit Handler
	const handleSubmit = async e => {
		e.preventDefault()

		//Validation
		const hasEmptyFields = Object.values(values).some(el => el === '')
		if (hasEmptyFields) {
			toast.error('Please fill in all fields')
		}
		const res = await fetch(`${API_URL}/events/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
		if (!res.ok) {
			toast.error('Something went wrong')
		} else {
			const event = await res.json()
			router.push(`/events/${event.slug}`)
		}
		setValues({
			name: '',
			performers: '',
			venue: '',
			address: '',
			date: '',
			time: '',
			description: '',
		})
	}

	const handleInputChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const imageUploaded = async e => {
		const res = await fetch(`${API_URL}/events/${id}`)
		const data = await res.json()
		setImagePreview(data.image.formats.thumbnail.url)
		setShowModal(false)
	}
	return (
		//Layout
		<Layout title="Add New Event">
			<Link href="/events">
				<a>{'<'} Go Back</a>
			</Link>
			<h1>Edit Event</h1>
			<ToastContainer />

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					{/* Grid Begins */}
					<div>
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="performers">Performers</label>
						<input
							type="text"
							name="performers"
							id="performers"
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="venue">Venue</label>
						<input
							type="text"
							name="venue"
							id="venue"
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							id="address"
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							name="date"
							id="date"
							value={moment(values.date).format('yyyy-MM-DD')}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input
							type="text"
							name="time"
							id="time"
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
					{/* Grid Ends */}
				</div>
				<div>
					<label htmlFor="description">Event Description</label>
					<textarea
						type="text"
						name="description"
						id="description"
						value={values.description}
						onChange={handleInputChange}
					></textarea>
				</div>
				<input type="submit" value="Update Event" className="btn" />
			</form>
			<h2>Event Image</h2>
			{imagePreview ? (
				<Image src={imagePreview} alt={slug} height={100} width={180} />
			) : (
				<div>
					<p>No Image Found</p>
				</div>
			)}
			<div>
				<button className={'btn-secondary'} onClick={() => setShowModal(true)}>
					<FaImage /> {'  '}Upload Image
				</button>
			</div>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload eventId={id} imageUploaded={imageUploaded} />
			</Modal>
		</Layout>
	)
}

// Server Side Props
export async function getServerSideProps({ params: { id } }) {
	const res = await fetch(`${API_URL}/events/${id}`)
	const event = await res.json()

	return {
		props: {
			event,
		},
	}
}
