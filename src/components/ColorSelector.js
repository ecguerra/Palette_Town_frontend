import { useState, useEffect, useRef } from 'react'
import { getCurrentUser } from '../services/appuser.service'
import { getUserPalettes, getOnePalette, createPalette } from '../services/palette.service'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

import Color from './Color'
import '../css/Color.css'
import '../css/ColorSelector.css'

const ColorSelector = () => {
    const form = useRef()

    const [currentUser, setCurrentUser] = useState(undefined)
    const [palettes, setPalettes] = useState(undefined)
    let [selectedPalette, setSelectedPalette] = useState(undefined)
    let [paletteDetails, setPaletteDetails] = useState(undefined)
    const [newPalette, setNewPalette] = useState('')

    // let [red, setRed] = useState(undefined)
    // let [green, setGreen] = useState(undefined)
    // let [blue, setBlue] = useState(undefined)
    
    let [red, setRed] = useState({
        one: Math.floor(Math.random()*256),
        two: Math.floor(Math.random()*256),
        three: Math.floor(Math.random()*256),
        four: Math.floor(Math.random()*256),
        five: Math.floor(Math.random()*256),
        six: Math.floor(Math.random()*256)
    })

    let [green, setGreen] = useState({
        one: Math.floor(Math.random()*256),
        two: Math.floor(Math.random()*256),
        three: Math.floor(Math.random()*256),
        four: Math.floor(Math.random()*256),
        five: Math.floor(Math.random()*256),
        six: Math.floor(Math.random()*256)
    })

    let [blue, setBlue] = useState({
        one: Math.floor(Math.random()*256),
        two: Math.floor(Math.random()*256),
        three: Math.floor(Math.random()*256),
        four: Math.floor(Math.random()*256),
        five: Math.floor(Math.random()*256),
        six: Math.floor(Math.random()*256)
    })

    let [random, setRandom] = useState(true)


    const onChangePalette = e => {
        setSelectedPalette(e.target.value)
    }

    const submitRandom = () => {
        // setRed(Math.floor(Math.random()*256))
        // setGreen(Math.floor(Math.random()*256))
        // setBlue(Math.floor(Math.random()*256))

        setRed({
            one: Math.floor(Math.random()*256),
            two: Math.floor(Math.random()*256),
            three: Math.floor(Math.random()*256),
            four: Math.floor(Math.random()*256),
            five: Math.floor(Math.random()*256),
            six: Math.floor(Math.random()*256)
        })

        setGreen({
            one: Math.floor(Math.random()*256),
            two: Math.floor(Math.random()*256),
            three: Math.floor(Math.random()*256),
            four: Math.floor(Math.random()*256),
            five: Math.floor(Math.random()*256),
            six: Math.floor(Math.random()*256)
        })

        setBlue({
            one: Math.floor(Math.random()*256),
            two: Math.floor(Math.random()*256),
            three: Math.floor(Math.random()*256),
            four: Math.floor(Math.random()*256),
            five: Math.floor(Math.random()*256),
            six: Math.floor(Math.random()*256)
        })

        setRandom(true)
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
                        oRed={red.one}
                        oGreen={green.one}
                        oBlue={blue.one}
                        oRandom = {random}
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red.two}
                        oGreen={green.two}
                        oBlue={blue.two}
                        oRandom = {random}
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red.three}
                        oGreen={green.three}
                        oBlue={blue.three}
                        oRandom = {random} 
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red.four}
                        oGreen={green.four}
                        oBlue={blue.four}
                        oRandom = {random} 
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red.five}
                        oGreen={green.five}
                        oBlue={blue.five}
                        oRandom = {random} 
                    />
                    <Color 
                        selectedPalette={selectedPalette}
                        oRed={red.six}
                        oGreen={green.six}
                        oBlue={blue.six}
                        oRandom = {random} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ColorSelector