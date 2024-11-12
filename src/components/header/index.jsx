import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import { doSignOut } from '../../firebase/auth'
import { auth } from '../../firebase/firebase'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    const [showConfirmation, setShowConfirmation] = useState(false)

    // Handle logout and navigate to the main page
    const handleLogout = async () => {
        await doSignOut(auth)
        setShowConfirmation(false)
        navigate('/')  // Redirect to the main page after logout
    }

    // Handle navigation to the home page
    const goToHome = () => {
        navigate('/home')  // Navigate to the /home route
    }

    return (
        <>
            <nav className='flex flex-row justify-between w-full z-20 fixed top-0 left-0 h-12 border-b items-center bg-gray-200 px-4'>
                {/* Logout button */}
                {userLoggedIn &&
                    <button 
                        onClick={() => setShowConfirmation(true)} 
                        className='text-sm text-blue-600 underline'
                    >
                        Logout
                    </button>
                }
            </nav>

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                        <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header