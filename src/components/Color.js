import { useState, useEffect } from 'react'
import { getColorRGB } from '../services/color.service'

import '../css/Color.css'

const Color = () => {
    const [red, setRed] = useState(Math.floor(Math.random()*256))
    const [green, setGreen] = useState(Math.floor(Math.random()*256))
    const [blue, setBlue] = useState(Math.floor(Math.random()*256))
    const [style, setStyle] = useState()

    const [details, setDetails] = useState()
    
    useEffect(() => {
        setStyle({backgroundColor: `rgb(${red},${green},${blue})`})
        getColorRGB(red, green, blue).then(response => {
            console.log(response.data)
        },
        error => {
            console.log(error)
        })
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