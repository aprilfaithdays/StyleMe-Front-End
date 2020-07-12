import React, { useState, useEffect } from 'react';
import OutfitCard from './OutfitCard';
import { useContext } from 'react';
import { OutfitsContext } from '../Context/Outfits';
import '../Styling/ProductPage.css';

const ProductCard = props => {
    const abortController = new AbortController();

    const id = props.id;
    const category = props.category;
    const [product, setProduct] = useState('');
    const [outfits] = useContext(OutfitsContext);
    const buttonStyle = "btn btn-outline-secondary btn-sm";
    const remButton = "btn btn-outline-danger btn-sm";

    const cleanUp = () => abortController.abort();

    useEffect(() => {
        getProduct();
        return cleanUp();
        // eslint-disable-next-line 
    }, []);

    const getProduct = () => {
        fetch(`https://boiling-reaches-37131.herokuapp.com/${category}/${id}`)
        .then(res => res.json())
        .then(res => setProduct(res));
        return cleanUp();
    }

    const productOutfits = () => {
        const list = [...outfits];
        let productList ;
        if (category === 'tops') { productList = list.filter(outfit => outfit.top_id === id) };
        if (category === 'bottoms') { productList = list.filter(outfit => outfit.bottom_id === id) };
        if (category === 'shoes') { productList = list.filter(outfit => outfit.shoe_id === id) };
        return productList;
    }

    const renderOutfit = () => {
        const list = [...productOutfits()];
        list.sort((a, b) => b.id - a.id);
        return list.map(outfit => <OutfitCard key={outfit.id} outfit={outfit}/> );
    }

    const removeFave = () => (
        <div className="favorite-btn">
            <button className={remButton} onClick={props.removeFavorite} value={id}> Remove Favorites </button>
        </div>
    )

    const addFave = () => (
        <div className="favorite-btn">
            <button className={buttonStyle} onClick={props.addFavorite} value={id}> Add Favorites </button>
        </div>
    )

    const renderOutfitList = () => (
        <div>
            <h5 className="section-title">- Outfits Created with this Product -</h5>
            <div className="outfits-section">
                {renderOutfit()}
            </div>
        </div>
    )

    const noOutfitsYet = () => (
        <div className="no-outfits">
            <em>
            Be the first to create an outfit with this product!<br/>
            <small>
                (Start by adding this to your favorites!)
            </small>
            </em>
        </div>
    )

    return(
        <div>
            <div className="product-section">
                <h2 className="title">{product.name}</h2>
                <div className="center-imgs">
                    <img className="show-img" src={product.live_view} alt="product"/>
                    <img className="show-img" src={product.img_url} alt="product"/>
                    <img className="show-img" src={product.back_view} alt="product"/>
                </div>
                <div className="center">
                    { props.favorite ?  removeFave() : addFave()}
                </div>
            </div>
                {productOutfits().length > 0 ? renderOutfitList() : noOutfitsYet()}
        </div>
    )
}

export default ProductCard
