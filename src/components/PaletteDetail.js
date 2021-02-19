import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOnePalette } from '../services/palette.service'

import '../css/Color.css'

const PaletteDetail = () => {
    const [palette, setPalette] = useState(undefined)
    let { id } = useParams()

    useEffect(()=> {
        getOnePalette(id).then(response=>{
            setPalette(response.data.data)
        }, error =>{
            console.log(error)
        })
    }, [])

    return(
        <>
            {palette ? (
                <>
                {palette.length > 0 ? (
                    <div>
                        <h2>{palette[0].palette.name}</h2>
                        <p>Created by {palette[0].palette.app_user.username}</p>
                        <Link to={`/palettes/edit/${id}`}>Edit</Link>
                        <div>
                            {palette.map(palette => (
                                <div key={palette.id} className='square' style={{backgroundColor: `${palette.color.rgb_name}`}}>
                                    <p>{palette.color.hex_name}</p>
                                    <p>{palette.color.rgb_name}</p>
                                    <p>{palette.color.hsl_name}</p>
                                    <p>{palette.color.cmyk_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>No palette details to display</div>
                )}
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default PaletteDetail