import React from 'react';
import ProductCard from '../Components/ProductCard';
import { useContext } from 'react';
import { CurrentUserContext } from '../Context/CurrentUser';
import { FaveTopsContext } from '../Context/FaveTops';

const TopContainer = props => {
    const abortController = new AbortController();

    const id = parseInt(props.match.params.id, 0);
    const faveTospUrl = 'https://boiling-reaches-37131.herokuapp.com/favorite_tops';
    const [currentUser] = useContext(CurrentUserContext);
    const [faveTops, setFaveTops] = useContext(FaveTopsContext);

    const filterMyFaveTops = () => {
        const list = [...faveTops];
        return list.filter(fave => fave.user_id === currentUser.id);
    }

    const faveTopsId = () => {
        const myList = filterMyFaveTops();
        return myList.map(fave => fave.top_id);
    }

    const cleanUp = () => abortController.abort();

    const addFavorite = e => {
        const id = parseInt(e.target.value, 0);
        fetch(faveTospUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: currentUser.id,
                top_id: id
            })
        })
        .then(res => res.json())
        .then(res => setFaveTops([...faveTops, res]));
        return cleanUp();
    }

    const removeFavorite = e =>{
        const id = parseInt(e.target.value, 0);
        const myList = filterMyFaveTops();
        const fave = myList.find(fave => (fave.user_id === currentUser.id && fave.top_id === id));

        fetch(`${faveTospUrl}/${fave.id}`, {
            method: 'DELETE'
        })
        removedFave(fave.id);
        return cleanUp();
    }

    const removedFave = id => {
        const faveTopsList = [...faveTops];
        const updated = faveTopsList.filter(fave => fave.id !== id );
        setFaveTops(updated);
    }

    const renderTop = () => {
        const faveTopsIdList = faveTopsId();
        return <ProductCard 
            category='tops' 
            id={id}
            favorite={faveTopsIdList.includes(id) ? true: false}
            addFavorite={addFavorite} 
            removeFavorite={removeFavorite}
        />;
    }

    return (
        <div>
            {renderTop()}
        </div>
    )
}

export default TopContainer