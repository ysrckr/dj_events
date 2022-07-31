import { API_URL } from '@config/index'
import axios from 'axios'
axios.defaults.baseURL = API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { identifier, password } = req.body.data

		try {
			const strapiRes = await axios.post(`/auth/local`, {
				identifier,
				password,
			})
			const data = await strapiRes.data
			res.json({ user: data.user })
		} catch (err) {
			const error = await err.response.data.data[0].messages[0].message
			res.json({ error })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).json({ message: `Method ${req.method} Not Allowed` })
	}
}

export default handler
