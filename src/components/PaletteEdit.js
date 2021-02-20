import { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { getOnePaletteName, updatePalette, deletePalette, getOnePalette } from '../services/palette.service'
import { deleteColorPalette } from '../services/colorpalette.service'

import '../css/Color.css'
import '../css/PaletteEdit.css'

const PaletteEdit = () => {
    const [paletteName, setPaletteName] = useState(undefined)
    const [fullPalette, setFullPalette] = useState(undefined)
    const [message, setMessage] = useState(undefined)
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
            console.log(response.data.status.message)
            setMessage(response.data.status.message)
        }, error => {
            console.log(error)
        })

    }

    const handleDelete = e => {
        deletePalette(id).then(response =>{
            console.log(response.data.status.message)
            history.push('/profile')
        }, error => {
            console.log(error)
        })
    }

    const removeColor = id => {
        deleteColorPalette(id)
        .then(response => {
            console.log(response.data.status.message)
        }, error => {
            console.log(error)
        })
    }

    useEffect(()=> {
        getOnePaletteName(id).then(response=>{
            setPaletteName(response.data.data[0].name)
        }, error =>{
            console.log(error)
        })
    }, [message])

    useEffect(()=> {
        getOnePalette(id).then(response=>{
            if(response.data.status.code === 200) {
                setFullPalette(response.data.data)
            }
        }, error =>{
            console.log(error)
        })
    }, [fullPalette])

    return(
        <>
            {paletteName ? (
                    <div className='edit-container'>
                        <div className='edit-form'>
                            <Form ref={form} onSubmit={handleSubmit}>
                                <Input 
                                    type='text'
                                    name='name'
                                    value={paletteName}
                                    onChange={onChangeName}
                                />
                                <Input 
                                    type='submit'
                                    className='button'
                                    value='Update Name'
                                />
                            </Form>
                            <button onClick={handleDelete}>Delete Palette</button>
                        </div>
                        {fullPalette ? (
                        <div className='color-container'>
                            {fullPalette.map(palette => (
                                <div key={palette.id} className='square' style={{backgroundColor: `${palette.color.rgb_name}`}}>
                                    <div className='details'>
                                        <p>{palette.color.hex_name}</p>
                                        <p>{palette.color.rgb_name}</p>
                                        <p>{palette.color.hsl_name}</p>
                                        <p>{palette.color.cmyk_name}</p>
                                    </div>
                                    <button onClick={()=>removeColor(palette.id)}>Remove from Palette</button>
                                </div>
                            ))}
                        </div>
                ) : (
                    <div>No palette details to display</div>
                )}
                    </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    )
}

export default PaletteEdit