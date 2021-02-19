import { useState, useEffect, useRef } from 'react'
import { getUserPalettes, createPalette } from '../services/palette.service'
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

const Profile = () => {
    const form = useRef()
    const [userPalettes, setUserPalettes] = useState(undefined)
    const [newPalette, setNewPalette] = useState('')
    
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

    return(
        <>
            {userPalettes ? (
                <div>
                    {userPalettes.length > 0 ? (
                        <>
                            {userPalettes.map(palette => (
                                <div key={palette.id}>
                                    <Link to={`/palettes/${palette.id}`}>
                                        <h4>{palette.name}</h4>
                                    </Link>
                                    <p>Created by {palette.app_user.username}</p>
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