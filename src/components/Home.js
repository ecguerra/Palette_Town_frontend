import { useHistory } from 'react-router-dom'
import '../css/Home.css'

const Home = () => {
    const history = useHistory()

    return (
        <div className='landing-page'>
            <div className='overlay'>
                    <h1>Build a Rainbow</h1>
                    <button onClick={()=>history.push('/signup')}>Sign Up</button>
            </div>
        </div>
    )
}

export default Home