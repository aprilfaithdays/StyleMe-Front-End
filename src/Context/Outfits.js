import React,  { useState, useEffect } from 'react';

export const OutfitsContext = React.createContext('');

const Outfits = ({children}) => {
    const abortController = new AbortController();
    const [outfits, setOutfits] = useState('');

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getOutfits();
        return cleanUp();
        // eslint-disable-next-line 
    },[])

    const getOutfits = () => {
        fetch('https://boiling-reaches-37131.herokuapp.com/outfits')
        .then(res => res.json())
        .then(res => setOutfits(res));
        return cleanUp();
    }

    return (
        <div>
            <OutfitsContext.Provider value={[outfits, setOutfits]}>
                {children}
            </OutfitsContext.Provider>
        </div>
    )
}

export default Outfits