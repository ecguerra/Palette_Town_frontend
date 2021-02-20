import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { logout, getCurrentUser } from '../../services/appuser.service'

import '../../css/Layout.css'

const Layout = (props) => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState()
    const [message, setMessage] = useState()
    
    useEffect(()=> {
        getCurrentUser().then(response => {
            if(response.data.status.code === 200) setCurrentUser(response.data.data)
            else setCurrentUser(undefined)
        }, error => {
            console.log(error)
        })
    }, [message])

    const logOut = () => {
        logout().then(response => {
            console.log(response.data)
            setMessage(response.data.status.message)
            history.push('/')
        }, error => {
            console.log(error)
        })
    }

    return (
        <>
            <nav>
                <div className='logo'>
                    <Link to='/'>Palette Town</Link>
                </div>
                <div>
                    <Link to='/home'>Home</Link>
                    <Link to='/color'>Colors</Link>
                {currentUser ? (
                    <>
                    <Link to='/profile'>{currentUser.username}</Link>
                    <button className='logout' onClick={logOut}>Log Out</button>
                    </>
                ) : (
                    <>
                    <Link to='/login'>Log In</Link>
                    <Link to='/signup'>Sign Up</Link>
                    </>
                )}
                </div>
            </nav>
            <div>{props.children}</div>
        </>
    )
}

export default Layout