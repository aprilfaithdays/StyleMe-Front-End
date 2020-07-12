import React,  { useState, useEffect } from 'react';

export const FaveTopsContext = React.createContext('');

const FaveTops = ({children}) => {
    const abortController = new AbortController();
    const [faveTops, setFaveTops] = useState([]);

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getFaveTops();
        return cleanUp();
        // eslint-disable-next-line 
    },[])

    const getFaveTops = () => {
        fetch('https://boiling-reaches-37131.herokuapp.com/favorite_tops')
        .then(res => res.json())
        .then(res => setFaveTops(res));
        return cleanUp();
    }

    return (
        <div>
            <FaveTopsContext.Provider value={[faveTops, setFaveTops]}>
                {children}
            </FaveTopsContext.Provider>
        </div>
    )
}

export default FaveTops