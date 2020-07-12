import React from 'react';
import{ Link } from 'react-router-dom';

const OutfitCard = props => {
    const outfit = props.outfit;
    const top = outfit.top ;
    const bottom = outfit.bottom;
    const shoe = outfit.shoe;
    const user = outfit.user;
    return(
        <div className="outfit-card">
            <strong> {outfit.name} <br/></strong>
            <em> Created by: {user.name}</em><br/>
            <Link to={`/outfits/${outfit.id}`}>
            <img className="product-img" src={top.img_url} alt='top'/> <br/>
            <img className="product-img" src={bottom.img_url} alt='bottom'/> <br/>
            <img className="product-img" src={shoe.img_url} alt='shoe'/> 
            </Link>
        </div>
    )
}

export default OutfitCard