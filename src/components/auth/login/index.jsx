import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/auth'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Helper function to get user-friendly error message
    const getErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'Invalid email address format.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later.';
            case 'auth/network-request-failed':
                return 'Network error. Please check your connection.';
            default:
                return 'Incorrect Details. Please try again.';
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('') // Clear any existing errors
        
        if(!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
            } catch (error) {
                setErrorMessage(getErrorMessage(error))
                setIsSigningIn(false)
            }
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        setErrorMessage('') // Clear any existing errors
        
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(error => {
                setErrorMessage(getErrorMessage(error))
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome Back, Admin</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { 
                                    setEmail(e.target.value)
                                    setErrorMessage('') // Clear error when user types
                                }}
                                className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${errorMessage ? 'border-red-500' : ''}`}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => { 
                                    setPassword(e.target.value)
                                    setErrorMessage('') // Clear error when user types
                                }}
                                className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300 ${errorMessage ? 'border-red-500' : ''}`}
                            />
                        </div>

                        {errorMessage && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Login