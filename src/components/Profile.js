import { useState, useEffect } from 'react'
import { getUserPalettes, getOnePalette } from '../services/palette.service'
import { Link } from 'react-router-dom'

import '../css/Color.css'
import '../css/Profile.css'

const Profile = () => {
    const [userPalettes, setUserPalettes] = useState(undefined)
    const [selectedPalette, setSelectedPalette] = useState(undefined)
    const [palettePreview, setPalettePreview] = useState(undefined)
    
    const onChangePalette = e => {
        setSelectedPalette(e.target.value)
    }

    useEffect(()=>{
        getUserPalettes()
        .then(response => {
            setUserPalettes(response.data.data)
        },
        error => {
            console.log(error)
        })
    },[])

    useEffect(()=>{
        getOnePalette(selectedPalette).then(response =>{
            if(response.data.status.code === 200) {
                setPalettePreview(response.data.data)
            }
            else setPalettePreview(undefined)
        }, error => {
            console.log(error)
        })
    },[selectedPalette])

    return(
        <div className='container'>
            {userPalettes ? (
                <>
                    <div className='left-profile'>
                        {palettePreview ? (
                        <div>
                            {palettePreview.map(details =>(
                                <div key={details.id} className='square' style={{backgroundColor:`${details.color.rgb_name}`}}>
                                    <div className='details'>
                                        <p>{details.color.hex_name}</p>
                                        <p>{details.color.rgb_name}</p>
                                        <p>{details.color.hsl_name}</p>
                                        <p>{details.color.cmyk_name}</p>
                                    </div>
                                </div>
                            ))}
                            <h2>{palettePreview[0].palette.name}</h2>
                        </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className='right-profile'>
                        {userPalettes.map(palette => (
                            <div key={palette.id}>
                                <button value={palette.id} onClick={onChangePalette}>{palette.name}</button>
                                <Link to={`/palettes/edit/${palette.id}`}>
                                    <h4>Edit</h4>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div>No palettes to display</div>
            )}
        </div>
    )
}

export default Profile