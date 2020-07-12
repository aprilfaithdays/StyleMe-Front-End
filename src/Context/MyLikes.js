import React, { useState, useContext, useEffect} from 'react';
import { LikedContext } from './Liked';

export const MyLikesContext = React.createContext([]);

const MyLikes = ({children}) => {
    const abortController = new AbortController();
    const [liked] = useContext(LikedContext);
    const [myLikes, setMyLikes] = useState([]);

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        myLiked();
        // eslint-disable-next-line 
    }, [liked]);

    useEffect(() => {
        return cleanUp();
        // eslint-disable-next-line 
    },[])
    
    const myLiked = () => {
        const userId = parseInt(localStorage.id, 0);
        const list = [...liked];
        const myList = list.filter(like => like.user_id === userId);
        setMyLikes(myList);
    }

    return (
        <div>
            <MyLikesContext.Provider value={[myLikes, setMyLikes]}>
                {children}
            </MyLikesContext.Provider>
        </div>
    )
}

export default MyLikes