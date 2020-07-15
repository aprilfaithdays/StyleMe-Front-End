import React,  { useState, useEffect } from 'react';

export const BottomsContext = React.createContext('');

const Bottoms = ({children}) => {
    const abortController = new AbortController();
    const [bottoms, setBottoms] = useState([]);

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getBottoms();
        return cleanUp();
        // eslint-disable-next-line 
    },[])

    const getBottoms = () => {
        fetch('https://damp-shelf-95653.herokuapp.com/bottoms')
        .then(res => res.json())
        .then(res => setBottoms(res))
        return cleanUp();
    }

    return (
        <div>
            <BottomsContext.Provider value={[bottoms, setBottoms]}>
                {children}
            </BottomsContext.Provider>
        </div>
    )
}

export default Bottoms
