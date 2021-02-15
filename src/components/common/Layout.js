import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../services/appuser.service'

const Layout = (props) => {
    const history = useHistory()

    const logOut = () => {
        logout()
        history.push('/')
    }

    return (
        <>
        <nav>
            <Link to='/home'>Home</Link>
            <Link to='/login'>Log In</Link>
            <Link to='/signup'>Sign Up</Link>
            <button onClick={logOut}>Log Out</button>
        </nav>
        <div>{props.children}</div>
        </>
    )
}

export default Layout