import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Layout from '@components/Layout'
import styles from '@styles/AuthForm.module.css'
import AuthContext from '@context/AuthContext'
const RegisterPage = () => {
	const { register, error } = useContext(AuthContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const [username, setUsername] = useState('')
	const handleSubmit = async e => {
		e.preventDefault()
		if (password !== passwordConfirm) {
			toast.error('Passwords do not match!')
			return
		}
		register({ username, email, password })
		setUsername('')
		setEmail('')
		setPassword('')
		setPasswordConfirm('')
	}
	return (
		<Layout title="Register">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
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
					<div>
						<label htmlFor="passwordConfirm">
							Confirm Password
						</label>
						<input
							type="password"
							id="passwordConfirm"
							value={passwordConfirm}
							onChange={e => setPasswordConfirm(e.target.value)}
						/>
					</div>
					<input type="submit" value="Register" className="btn" />
				</form>
				<p>
					{' '}
					Already have an account?{' '}
					<Link href="/account/login">
						<a>Login</a>
					</Link>{' '}
				</p>
			</div>
		</Layout>
	)
}

export default RegisterPage
