import React,  { useState, useEffect } from 'react';

export const FaveShoesContext = React.createContext('');

const FaveShoes = ({children}) => {
    const abortController = new AbortController();
    const [faveShoes, setFaveShoes] = useState([]);

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getFaveShoes();
        return cleanUp();
        // eslint-disable-next-line 
    },[])

    const getFaveShoes = () => {
        fetch('https://boiling-reaches-37131.herokuapp.com/favorite_shoes')
        .then(res => res.json())
        .then(res => setFaveShoes(res));
        return cleanUp();
    }

    return (
        <div>
            <FaveShoesContext.Provider value={[faveShoes, setFaveShoes]}>
                {children}
            </FaveShoesContext.Provider>
        </div>
    )
}

export default FaveShoes