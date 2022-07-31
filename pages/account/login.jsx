import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Layout from '@components/Layout'
import styles from '@styles/AuthForm.module.css'
import AuthContext from '@context/AuthContext'
const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, error } = useContext(AuthContext)
	const handleSubmit = async e => {
		e.preventDefault()
		login({email, password})
		setEmail('')
		setPassword('')
	}
	return (
		<Layout title="User Login">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Login
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<input type="submit" value="Login" className="btn" />
				</form>
				<p>
					{' '}
					Don&apos;t have an account?{' '}
					<Link href="/account/register">
						<a>Register</a>
					</Link>{' '}
				</p>
			</div>
		</Layout>
	)
}

export default LoginPage
