import React from 'react';
import ProductCard from '../Components/ProductCard';
import { useContext } from 'react';
import { CurrentUserContext } from '../Context/CurrentUser';
import { FaveShoesContext } from '../Context/FaveShoes';

const ShoeContainer = props => {
    const abortController = new AbortController();

    const id = parseInt(props.match.params.id, 0);
    const faveShoesUrl = 'https://boiling-reaches-37131.herokuapp.com/favorite_shoes';
    const [currentUser] = useContext(CurrentUserContext);
    const [faveShoes, setFaveShoes] = useContext(FaveShoesContext);

    const filterMyFaveShoes = () => {
        const list = [...faveShoes];
        return list.filter(fave => fave.user_id === currentUser.id);
    }

    const faveShoesId = () => {
        const myList = filterMyFaveShoes();
        return myList.map(fave => fave.shoe_id);
    }

    const cleanUp = () => abortController.abort();

    const addFavorite = e => {
        const id = e.target.value
        fetch(faveShoesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: currentUser.id,
                shoe_id: id
            })
        })
        .then(res => res.json())
        .then(res => setFaveShoes([...faveShoes, res]));
        return cleanUp();
    }

    const removeFavorite = e => {
        const id = parseInt(e.target.value, 0);
        const myList = filterMyFaveShoes();
        const fave = myList.find(fave => (fave.user_id === currentUser.id && fave.shoe_id === id));

        fetch(`${faveShoesUrl}/${fave.id}`, {
            method: 'DELETE'
        });
        removedFave(fave.id);
        return cleanUp();
    }

    const removedFave = id => {
        const faveShoesList = [...faveShoes];
        const updated = faveShoesList.filter(fave => fave.id !== id);
        setFaveShoes(updated);
    }

    const renderShoe = () => {
        const faveShoesIdList = faveShoesId();;
        return <ProductCard 
            category='shoes' 
            id={id}
            favorite={faveShoesIdList.includes(id) ? true: false}
            addFavorite={addFavorite} 
            removeFavorite={removeFavorite}
        />;
    }

    return (
        <div>
            {renderShoe()}
        </div>
    )
}

export default ShoeContainer