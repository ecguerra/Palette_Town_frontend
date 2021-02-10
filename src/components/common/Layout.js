import { Link } from 'react-router-dom'

const Layout = (props) => {
    return (
        <>
        <nav>
            <Link to='/home'>Home</Link>
        </nav>
        <div>{props.children}</div>
        </>
    )
}

export default Layout