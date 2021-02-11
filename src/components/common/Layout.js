import { Link } from 'react-router-dom'
import { logout } from '../../services/appuser.service'

const Layout = (props) => {

    const logOut = () => {
        logout()
    }

    return (
        <>
        <nav>
            <Link to='/home'>Home</Link>
            <a href='/' onClick={logOut}>Log Out</a>
        </nav>
        <div>{props.children}</div>
        </>
    )
}

export default Layout