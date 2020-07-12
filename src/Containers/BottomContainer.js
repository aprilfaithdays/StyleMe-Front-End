import React from 'react';
import ProductCard from '../Components/ProductCard';
import { useContext } from 'react';
import { CurrentUserContext } from '../Context/CurrentUser';
import { FaveBottomsContext } from '../Context/FaveBottoms';

const BottomContainer = props => {
    const abortController = new AbortController();
    const id = parseInt(props.match.params.id, 0);
    const faveBottomsUrl = 'https://boiling-reaches-37131.herokuapp.com/favorite_bottoms';
    const [currentUser] = useContext(CurrentUserContext);
    const [faveBottoms, setFaveBottoms] = useContext(FaveBottomsContext);

    const filterMyFaveBottoms = () => {
        const list = [...faveBottoms];
        return list.filter(fave => fave.user_id === currentUser.id);
    }

    const faveBottomsId = () => {
        const myList = filterMyFaveBottoms();
        return myList.map(fave => fave.bottom_id);
    }

    const cleanUp = () => abortController.abort();

    const addFavorite = e => {
        const id = e.target.value;
        fetch(faveBottomsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: currentUser.id,
                bottom_id: id
            })
        })
        .then(res => res.json())
        .then(res => setFaveBottoms([...faveBottoms, res]))
        return cleanUp();
    }

    const removeFavorite  = e => {
        const id = parseInt(e.target.value, 0);
        const myList = filterMyFaveBottoms();
        const fave = myList.find(fave => (fave.user_id === currentUser.id && fave.bottom_id === id));

        fetch(`${faveBottomsUrl}/${fave.id}`, {
            method: 'DELETE'
        });
        removedFave(fave.id);
        return cleanUp();
    }

    const removedFave = id => {
        const faveBottomsList = [...faveBottoms];
        const updated = faveBottomsList.filter(fave => fave.id !== id);
        setFaveBottoms(updated);
    }

    const renderBottom = () => {
        const faveBottomsIdList = faveBottomsId();
        return <ProductCard 
            category='bottoms' 
            id={id}
            favorite={faveBottomsIdList.includes(id) ? true: false}
            addFavorite={addFavorite} 
            removeFavorite={removeFavorite}
        />;
    }

    return (
        <div>
            {renderBottom()}
        </div>
    )
}

export default BottomContainer