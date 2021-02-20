import { useState, useEffect} from 'react'
import FlashMessage from 'react-flash-message'

import '../../css/App.css'

const Message = ({alert}) => {
    const [message, setMessage] = useState(alert)

    useEffect(()=>{
        setMessage(alert)
    },[alert])

    return(
        <FlashMessage duration={5000} persistOnHover={true}>
            <div className='alert'>
                {message}
            </div>
        </FlashMessage>
    )
}

export default Message