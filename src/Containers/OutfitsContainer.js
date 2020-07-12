import React, { useContext } from 'react';
import { OutfitsContext } from '../Context/Outfits';
import OutfitCard from '../Components/OutfitCard';

const OutfitsContainer = () => {
    const [outfits] = useContext(OutfitsContext);

    const renderOutfits = () => {
        const list = [...outfits];
        list.sort((a, b) => b.id - a.id);
        return list.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />);
    }

    return(
        <div>
            <h3>Browse All Outfits</h3>
            <div className='outfit-list'>
                {renderOutfits()}
            </div>
        </div>
    )
}

export default OutfitsContainer