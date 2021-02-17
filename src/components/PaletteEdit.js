import { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { getOnePaletteName, updatePalette, deletePalette } from '../services/palette.service'

import '../css/Color.css'

const PaletteEdit = () => {
    const [paletteName, setPaletteName] = useState(undefined)
    let { id } = useParams()
    const history = useHistory()
    const form = useRef()

    const onChangeName = e => {
        const name = e.target.value
        setPaletteName(name)
    }

    const handleSubmit = e => {
        e.preventDefault()
        updatePalette(id,paletteName).then(response => {
            console.log(response.data)
            history.push('/profile')
        }, error => {
            console.log(error)
        })

    }

    const handleDelete = e => {
        deletePalette(id).then(response =>{
            console.log(response.data)
            history.push('/profile')
        }, error => {
            console.log(error)
        })
    }

    useEffect(()=> {
        getOnePaletteName(id).then(response=>{
            console.log(response.data.data[0].name)
            setPaletteName(response.data.data[0].name)
        }, error =>{
            console.log(error)
        })
    }, [])

    return(
        <>
            {paletteName ? (
                    <div>
                        <Form ref={form} onSubmit={handleSubmit}>
                            <Input 
                                type='text'
                                name='name'
                                value={paletteName}
                                onChange={onChangeName}
                            />
                            <Input 
                                type='submit'
                                value='Update Palette'
                            />
                        </Form>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default PaletteEdit