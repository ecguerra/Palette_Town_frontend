import { useState, useEffect } from 'react'

import '../css/Color.css'

const Color = () => {
    const [red, setRed] = useState(Math.floor(Math.random()*256))
    const [green, setGreen] = useState(Math.floor(Math.random()*256))
    const [blue, setBlue] = useState(Math.floor(Math.random()*256))
    const [style, setStyle] = useState()
    
    useEffect(() => {
        setStyle({backgroundColor: `rgb(${red},${green},${blue})`})
    },[])

    return (
        <>
            {style ? (
                <div className='square' style={style}>
                </div>
            ) : (
                <div>
                    Loading...
                </div>
            )}
        </>
    )
}

export default Color