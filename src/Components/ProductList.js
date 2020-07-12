import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = props => {
    const product = props.product;
    const buttonStyle = "btn btn-outline-secondary btn-sm";
    const remButton = "btn btn-outline-danger btn-sm";


    const removeFave = () => (
        <div className="favorite-btn">
            <button className={remButton} onClick={props.removeFavorite} value={product.id}> Remove Favorites </button>
        </div>
    )

    const addFave = () => (
        <div className="favorite-btn">
            <button className={buttonStyle} onClick={props.addFavorite} value={product.id}> Add Favorites </button>
        </div>
    )

    return(
        <div>
            <div className="product-card">
                <Link to={`/${product.category}/${product.id}`} >
                    <img className="product-img" src={product.img_url} alt="product"/>
                </Link><br/>
                { props.favorite ?  removeFave() : addFave()}
            </div>
        </div>
    )
}

export default ProductList