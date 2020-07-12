import React,  { useState, useEffect } from 'react';

export const ShoesContext = React.createContext('');

const Shoes = ({children}) => {
    const abortController = new AbortController();
    const [shoes, setShoes] = useState('');

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getShoes();
        return cleanUp();
        // eslint-disable-next-line 
    },[]);

    const getShoes = () => {
        fetch('https://boiling-reaches-37131.herokuapp.com/shoes')
        .then(res => res.json())
        .then(res => setShoes(res));
        return cleanUp();
    }

    return (
        <div>
            <ShoesContext.Provider value={[shoes, setShoes]}>
                {children}
                </ShoesContext.Provider>
        </div>
    )
}

export default Shoes