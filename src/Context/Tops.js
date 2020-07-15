import React,  { useState, useEffect } from 'react';

export const TopsContext = React.createContext('');

const Tops = ({children}) => {
    const abortController = new AbortController();
    const [tops, setTops] = useState([]);

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getTops();
        return cleanUp();
        // eslint-disable-next-line 
    },[]);

    const getTops = () => {
        fetch('https://obscure-wave-67967.herokuapp.com/tops')
        .then(res => res.json())
        .then(res => setTops(res));
        return cleanUp();
    }
    return (
        <div>
            <TopsContext.Provider value={[tops, setTops]}>
                {children}
            </TopsContext.Provider>
        </div>
    )
}

export default Tops