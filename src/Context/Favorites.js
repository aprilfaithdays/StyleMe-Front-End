import React, { useState } from 'react';

export const MyTopsContext = React.createContext([]);
export const MyBottomsContext = React.createContext([]);
export const MyShoesContext = React.createContext([]);

const Favorites = ({children}) => {
    const [myTops, setMyTops] = useState([]);
    const [myBottoms, setMyBottoms] = useState([]);
    const [myShoes, setMyShoes] = useState([]);

    return (
        <div>
            <MyTopsContext.Provider value={[myTops, setMyTops]}>
                <MyBottomsContext.Provider value={[myBottoms, setMyBottoms]}>
                    <MyShoesContext.Provider value={[myShoes, setMyShoes]}>
                        {children}
                    </MyShoesContext.Provider>
                </MyBottomsContext.Provider>
            </MyTopsContext.Provider>
        </div>
    )
}

export default Favorites