import React,  { useState, useEffect } from 'react';

export const FaveBottomsContext = React.createContext('');

const FaveBottoms = ({children}) => {
    const abortController = new AbortController();
    const [faveBottoms, setFaveBottoms] = useState([]);
    
    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getFaveBottoms();
        return cleanUp();
        // eslint-disable-next-line 
    },[])

    const getFaveBottoms = () => {
        fetch('https://boiling-reaches-37131.herokuapp.com/favorite_bottoms')
        .then(res => res.json())
        .then(res => setFaveBottoms(res));
        return cleanUp();
    }

    return (
        <div>
            <FaveBottomsContext.Provider value={[faveBottoms, setFaveBottoms]}>
                {children}
            </FaveBottomsContext.Provider>
        </div>
    )
}

export default FaveBottoms