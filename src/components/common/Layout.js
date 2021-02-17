import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { logout, getCurrentUser } from '../../services/appuser.service'

const Layout = (props) => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState()
    
    useEffect(()=> {
        getCurrentUser().then(response => {
            console.log(response.data.data)
            setCurrentUser(response.data.data)
        }, error => {
            console.log(error)
        })
    }, [])

    const logOut = () => {
        logout()
        history.push('/')
    }

    return (
        <>
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/color'>Colors</Link>
            {currentUser ? (
                <>
                <Link to='/profile'>{currentUser.username}</Link>
                <button onClick={logOut}>Log Out</button>
                </>
            ) : (
                <>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
                </>
            )}
            </nav>
            <div>{props.children}</div>
        </>
    )
}

export default Layout