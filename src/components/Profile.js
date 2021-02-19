import { useState, useEffect, useRef } from 'react'
import { getUserPalettes, getOnePalette, createPalette } from '../services/palette.service'
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

import '../css/Color.css'

const Profile = () => {
    const form = useRef()
    const [userPalettes, setUserPalettes] = useState(undefined)
    const [selectedPalette, setSelectedPalette] = useState(undefined)
    const [palettePreview, setPalettePreview] = useState(undefined)
    const [newPalette, setNewPalette] = useState('')
    
    const onChangePalette = e => {
        setSelectedPalette(e.target.value)
    }
    
    const onChangeName = e => {
        const name = e.target.value
        setNewPalette(name)
    }

    const handleSubmit = e => {
        e.preventDefault()
        createPalette(newPalette).then(response => {
            console.log(response.data)
        }, error => {
            console.log(error)
        })

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
        <>
            {userPalettes ? (
                <div>
                    {userPalettes.length > 0 ? (
                        <>
                            {palettePreview ? (
                            <div>
                                {palettePreview.map(details =>(
                                    <div key={details.id} className='preview' style={{backgroundColor:`${details.color.rgb_name}`}}>
                                    </div>
                                ))}
                            </div>
                            ) : (
                                <></>
                            )}
                            {userPalettes.map(palette => (
                                <div key={palette.id}>
                                    <Link to={`/palettes/${palette.id}`}>
                                        <h4>{palette.name}</h4>
                                    </Link>
                                    <button value={palette.id} onClick={onChangePalette}>Preview</button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div>No palettes to display</div>
                    )}
                </div>
            ) :
            (
                <div>No palettes to display</div>
            )}
                <Form ref={form} onSubmit={handleSubmit}>
                    <Input 
                        type='text' 
                        name='name'
                        value={newPalette} 
                        placeholder='New palette name...'
                        onChange={onChangeName} 
                    />
                    <Input type='submit' value='Create a new palette'/>
                </Form>

        </>
    )
}

export default Profile