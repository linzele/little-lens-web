import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import { doSignOut } from '../../firebase/auth'
import { auth } from '../../firebase/firebase'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    // Handle logout and navigate to the main page
    const handleLogout = async () => {
        await doSignOut(auth)
        navigate('/')  // Redirect to the main page after logout
    }

    // Handle navigation to the home page
    const goToHome = () => {
        navigate('/home')  // Navigate to the /home route
    }

    return (
        <nav className='flex flex-row justify-between w-full z-20 fixed top-0 left-0 h-12 border-b items-center bg-gray-200 px-4'>


            {/* Logout button (top right) */}
            {userLoggedIn &&
                <button 
                    onClick={handleLogout} 
                    className='text-sm text-blue-600 underline'
                >
                    Logout
                </button>
            }
        </nav>
    )
}

export default Header;
