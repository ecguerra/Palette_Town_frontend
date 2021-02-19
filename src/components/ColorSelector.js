import { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/appuser.service'
import { getUserPalettes, getOnePalette } from '../services/palette.service'

import Color from './Color'
import '../css/Color.css'

const ColorSelector = () => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [palettes, setPalettes] = useState(undefined)
    let [selectedPalette, setSelectedPalette] = useState(undefined)
    let [paletteDetails, setPaletteDetails] = useState(undefined)

    let [red, setRed] = useState('')
    let [green, setGreen] = useState('')
    let [blue, setBlue] = useState('')

    const onChangePalette = e => {
        setSelectedPalette(e.target.value)
    }

    const submitRandom = e => {
        setRed('')
        setGreen('')
        setBlue('')
        window.location.reload()
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
    },[currentUser])

    useEffect(()=>{
        getOnePalette(selectedPalette).then(response =>{
            if(response.data.status.code === 200) {
                setPaletteDetails(response.data.data)
            }
            else setPaletteDetails(undefined)
        }, error => {
            console.log(error)
        })
    },[selectedPalette])

    return(
        <>
            {currentUser && palettes ? (
                <div>
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
            <div>
                <button onClick={submitRandom}>Get Random Colors</button>
                <div>
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
        </>
    )
}

export default ColorSelector