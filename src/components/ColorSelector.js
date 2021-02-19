import { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/appuser.service'
import { getUserPalettes } from '../services/palette.service'

import Color from './Color'

const ColorSelector = () => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [palettes, setPalettes] = useState(undefined)
    let [selectedPalette, setSelectedPalette] = useState('Philip')
    const [red, setRed] = useState('')
    const [green, setGreen] = useState('')
    const [blue, setBlue] = useState('')

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