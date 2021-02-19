import { useState, useEffect } from 'react'
import { getColorRGB, createColor } from '../services/color.service'
import { createColorPalette } from '../services/colorpalette.service'

import '../css/Color.css'

const Color = ({selectedPalette, oRed, oGreen, oBlue}) => {
    // const [red, setRed] = useState(Math.floor(Math.random()*256))
    // const [green, setGreen] = useState(Math.floor(Math.random()*256))
    // const [blue, setBlue] = useState(Math.floor(Math.random()*256))

    const [red, setRed] = useState(oRed)
    const [green, setGreen] = useState(oGreen)
    const [blue, setBlue] = useState(oBlue)
    
    const [style, setStyle] = useState()
    const [details, setDetails] = useState()

    const [palette, setPalette] = useState(selectedPalette)

    const handleSave = e => {
        createColor(details.name,
            details.hex_name,
            details.rgb_name,
            details.hsl_name,
            details.cmyk_name)
        .then(createdColor => {
            createColorPalette(createdColor.data.data.id, palette)
            .then(response => {
                console.log(response.data.status.message)
            }, error => {
                console.log(error)
            })
        }, error => {
            console.log(error)

        })
    }

    useEffect(()=>{
        if (red === '') {
            setRed((Math.floor(Math.random()*256)))
            setGreen((Math.floor(Math.random()*256)))
            setBlue((Math.floor(Math.random()*256)))
        }
    },[red, green, blue])


    useEffect(()=>{
        setPalette(selectedPalette)
    },[selectedPalette])


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
    },[red,green,blue])

    return (
        <>
            {style ? (
                <div className='square' style={style}>
                    {details ? (
                        <div className='details'>
                            <p>{details.hex_name}</p>
                            <p>{details.rgb_name}</p>
                            <p>{details.hsl_name}</p>
                            <p>{details.cmyk_name}</p>
                            {/* { palette ? ( */}
                                <button onClick={handleSave}>Save</button>
                            {/* ) : (
                                <></>
                            )} */}
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