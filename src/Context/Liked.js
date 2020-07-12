import React,  { useState, useEffect } from 'react';

export const LikedContext = React.createContext('');

const Liked = ({children}) => {
    const abortController = new AbortController();
    const [liked, setLiked] = useState([]);

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getLiked();
        return cleanUp();
        // eslint-disable-next-line 
    },[])

    const getLiked = () => {
        fetch('https://boiling-reaches-37131.herokuapp.com/likes')
        .then(res => res.json())
        .then(res => setLiked(res));
        return cleanUp();
    }


    return (
        <div>
            <LikedContext.Provider value={[liked, setLiked]}>
                {children}
            </LikedContext.Provider>
        </div>
    )
}

export default Liked