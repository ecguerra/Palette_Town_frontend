import { useState, useEffect } from 'react'
import { getCurrentUser } from '../services/appuser.service'
import { getUserPalettes } from '../services/palette.service'

import Color from './Color'

const ColorSelector = () => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [palettes, setPalettes] = useState(undefined)
    let [selectedPalette, setSelectedPalette] = useState('Philip')

    const onChangePalette = e => {
        setSelectedPalette(e.target.value)
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
                <Color selectedPalette={selectedPalette} />
                <Color selectedPalette={selectedPalette} />
                <Color selectedPalette={selectedPalette} />
                <Color selectedPalette={selectedPalette} />
                <Color selectedPalette={selectedPalette} />
                <Color selectedPalette={selectedPalette} />
            </div>
        </>
    )
}

export default ColorSelector