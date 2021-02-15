import { useState, useEffect } from 'react'
import { getAllPalettes } from '../services/palette.service'
import { Link } from 'react-router-dom'

const Palette = () => {
    const [allPalettes, setAllPalettes] = useState(undefined)

    useEffect(()=>{
        getAllPalettes()
        .then(response => {
            console.log(response.data.data)
            setAllPalettes(response.data.data)
        },
        error => {
            console.log(error)
        })
    },[])

    return(
        <>
            {allPalettes ? (
                <div>
                    {allPalettes.length > 0 ? (
                        <>
                            {allPalettes.map(palette => (
                                <div key={palette.id}>
                                    <Link to={`/palettes/${palette.id}`}>
                                        <h4>{palette.name}</h4>
                                    </Link>
                                    <p>Created by {palette.app_user.username}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div>No Palettes to display</div>
                    )}
                </div>
            ) :
            (
                <div>Loading...</div>
            )}
        </>
    )
}

export default Palette