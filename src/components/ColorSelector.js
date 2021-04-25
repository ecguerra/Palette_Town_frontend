import { useState, useEffect, useRef } from 'react'
import { getCurrentUser } from '../services/appuser.service'
import { getUserPalettes, getOnePalette, createPalette } from '../services/palette.service'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

import { nanoid } from 'nanoid'

import Color from './Color'
import Refresh from './Refresh'
import '../css/Color.css'
import '../css/ColorSelector.css'

const ColorSelector = () => {
    const form = useRef()
    // let update = useRef(true)

    const [currentUser, setCurrentUser] = useState(undefined)
    const [palettes, setPalettes] = useState(undefined)
    let [selectedPalette, setSelectedPalette] = useState(undefined)
    let [paletteDetails, setPaletteDetails] = useState(undefined)
    const [newPalette, setNewPalette] = useState('')

    let [red, setRed] = useState(undefined)
    let [green, setGreen] = useState(undefined)
    let [blue, setBlue] = useState(undefined)
    
    let [update, setUpdate] = useState(true)


    const onChangePalette = e => {
        setSelectedPalette(e.target.value)
    }

    const submitRandom = () => {
        setRed(Math.floor(Math.random()*256))
        setGreen(Math.floor(Math.random()*256))
        setBlue(Math.floor(Math.random()*256))
        // setUpdate(!update)
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

    useEffect(()=> {
        getCurrentUser().then(response => {
            if(response.data.status.code === 200) {
                setCurrentUser(response.data.data)
            }
            else setCurrentUser(undefined)
        }, error => {
            console.log(error)
        })
    }, [])

    useEffect(()=>{
        getUserPalettes().then(response=>{
            if(response.data.status.code === 200) {
                setPalettes(response.data.data)
            }
            else setPalettes(undefined)
        }, error => {
            console.log(error)
        })   
    },[currentUser, newPalette])

    useEffect(()=>{
        getOnePalette(selectedPalette).then(response =>{
            if(response.data.status.code === 200) {
                setPaletteDetails(response.data.data)
            }
            else setPaletteDetails(undefined)
        }, error => {
            console.log(error)
        })
    },[selectedPalette, red, green, blue])

    return(
        <div className='container'>
        <div className='left-selector'>
            {currentUser && palettes ? (
                <div className='select-container'>
                    <select name='choosePalette' value={selectedPalette} onChange={onChangePalette}>
                            <option>----Select a palette----</option>
                        {palettes.map(palette =>(
                            <option value={palette.id} key={palette.id}>{palette.name}</option>
                        ))}
                    </select>
                    {paletteDetails ? (
                        <div>
                            {paletteDetails.map(details =>(
                                <div key={details.id} className='preview' style={{backgroundColor:`${details.color.rgb_name}`}}>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}
            {currentUser && 
                <Form ref={form} onSubmit={handleSubmit}>
                    <Input 
                        type='text' 
                        name='name'
                        value={newPalette} 
                        placeholder='New palette name...'
                        onChange={onChangeName} 
                    />
                    <Input type='submit' className='create button' value='Create a new palette'/>
                </Form>
            }
            </div>
            <div className='right-selector'>
                <button className='random button' onClick={submitRandom}>Get Random Colors</button>
                <div className='color-container'>
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red}
                        oGreen={green}
                        oBlue={blue}
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red}
                        oGreen={green}
                        oBlue={blue}
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red}
                        oGreen={green}
                        oBlue={blue} 
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red}
                        oGreen={green}
                        oBlue={blue} 
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red}
                        oGreen={green}
                        oBlue={blue} 
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red}
                        oGreen={green}
                        oBlue={blue} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ColorSelector