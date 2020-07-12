import React, { useState } from 'react';

export const NewTopContext = React.createContext('');
export const NewBottomContext = React.createContext('');
export const NewShoeContext = React.createContext('');
export const TabKeyContext = React.createContext('');

const Store = ({children}) => {
    const [newTop, setNewTop] = useState('');
    const [newBottom, setNewBottom] = useState('');
    const [newShoe, setNewShoe] = useState('');
    const [key, setKey] = useState('tops');

    return (
        <div>
            <NewTopContext.Provider value={[newTop, setNewTop]}>
            <NewBottomContext.Provider value={[newBottom, setNewBottom]}>
            <NewShoeContext.Provider value={[newShoe, setNewShoe]}>
            <TabKeyContext.Provider value={[key, setKey]}>
                {children}
            </TabKeyContext.Provider>
            </NewShoeContext.Provider>
            </NewBottomContext.Provider>
            </NewTopContext.Provider>
        </div>
    )
}

export default Store