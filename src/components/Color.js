import { useState, useEffect } from 'react'
import { getColorRGB, createColor } from '../services/color.service'

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
            // console.log(response.data)
            setDetails({
                name: response.data.name.value,
                hex_name: response.data.hex.value,
                rgb_name: response.data.rgb.value,
                hsl_name: response.data.hsl.value,
                cmyk_name: response.data.cmyk.value
            })
        },
        error => {
            console.log(error)
        })
    },[])

    return (
        <>
            {style ? (
                <div className='square' style={style}>
                    {details ? (
                        <div className='details'>
                            <h4>{details.name}</h4>
                            <p>{details.hex_name}</p>
                            <p>{details.rgb_name}</p>
                            <p>{details.hsl_name}</p>
                            <p>{details.cmyk_name}</p>
                            <button onClick={()=>createColor(details.name,details.hex_name,details.rgb_name,details.hsl_name,details.cmyk_name)}>Save</button>
                        </div>
                    ) : (
                        <></>
                    )}
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