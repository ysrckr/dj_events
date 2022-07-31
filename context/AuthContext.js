import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@config/index'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)

	// Register user
	const register = async user => {
		console.log(user)
	}
	// Login user
	const login = async ({ email: identifier, password }) => {
		const res = await axios.post(`/api/login`, {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				identifier,
				password,
			},
		})
		const data = await res.data
		console.log(data)
		if (res.ok) {
			setUser(data.user)
		} else {
			setError(data.error)
			setError(null)
		}
	}
	// Logout user
	const logout = async () => {
		console.log('logout')
	}

	// Check if user is logged in
	const checkAuth = async user => {
		console.log('checkAuth')
	}

	return (
		<AuthContext.Provider value={{ user, error, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
