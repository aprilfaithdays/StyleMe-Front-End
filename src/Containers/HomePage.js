import React, { useContext } from 'react';
import { OutfitsContext } from '../Context/Outfits';
import { CurrentUserContext } from '../Context/CurrentUser';
import OutfitCard from '../Components/OutfitCard';
import NewHomePage from '../Components/NewHomePage';

const HomePage = () => {
    const [currentUser] = useContext(CurrentUserContext);
    const [outfits] = useContext(OutfitsContext);

    const filterMyOutfits = () => {
        const list = [...outfits];
        const myList = list.filter(outfit => outfit.user_id === currentUser.id);
        return myList.sort((a, b) => b.id - a.id);
    }

    const renderOutfits = () => {
        const myOutfits = filterMyOutfits();
        return myOutfits.map(outfit =>  <OutfitCard key={outfit.id} outfit={outfit}/>);
    }

    const renderMyOutfits = () => (
        <div>
            <h3>My Outfits</h3>
            <div className="outfit-list">
                {renderOutfits()}
            </div>
        </div>
    )

    return(
        <div>
            {filterMyOutfits().length > 0 ? renderMyOutfits() : <NewHomePage/>} 
        </div>
    )
}

export default HomePage