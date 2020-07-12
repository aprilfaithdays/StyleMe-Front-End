import React, { useContext, useState } from 'react';
import '../Styling/ProductList.css';
import ProductList from '../Components/ProductList';
import FilterOptionsForm from '../Components/FilterOptionsForm';
import { FaveShoesContext } from '../Context/FaveShoes';
import { ShoesContext } from '../Context/Shoes';
import { CurrentUserContext } from '../Context/CurrentUser';


const ShoesContainer = () => {
    const abortController = new AbortController();

    const faveShoesUrl = 'https://boiling-reaches-37131.herokuapp.com/favorite_shoes';
    const [currentUser] = useContext(CurrentUserContext);
    const [faveShoes, setFaveShoes] = useContext(FaveShoesContext);
    const [shoes] = useContext(ShoesContext);

    const [filterColor, setFilterColor] = useState('');
    const [filterMenu, setFilterMenu] = useState(false);

    const buttonStyle = "btn btn-outline-info btn-sm";
    const clearButton = "btn btn-outline-secondary btn-sm";

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
        const id = e.target.value;
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

    const renderShoes = () => {
        const list = filteredShoes();
        const faveShoes = faveShoesId();
        return list.map(shoe => {
            return <ProductList 
                key={shoe.id} 
                product={shoe} 
                favorite={faveShoes.includes(shoe.id) ? true: false}
                addFavorite={addFavorite} 
                removeFavorite={removeFavorite}
            />
        });
    }

    const colorsObject = () => {
        let list = [...shoes];
        let options = [];
        let optionsObject = {};

        for(let i = 0; i < list.length; i++){
            let shoe = (list[i].color).split(" ")
            for(let j = 0; j < shoe.length; j++){
                let color = shoe[j];
                options.push(color);
            }
        }

        options.sort((a, b) => a.localeCompare(b));
        for(let color of options){
           if(optionsObject[color]){
            optionsObject[color]++;
           } else {
            optionsObject[color] = 1;
           }
        } 
        return optionsObject;
    }
    
    const colorsOptions = () => {
        const colors = colorsObject();
        let list = [];

        for(const [color, amount] of Object.entries(colors)){
            list.push({color, amount});
        }

        return list;
    }

    const renderOptions = () => {
        const list = colorsOptions();
        return list.map((option, index) => <div key={index}><FilterOptionsForm option={option} checkFilter={checkFilter}/></div>);
    }

    const checkFilter = e => {
        let update ;
        if(filterColor.includes(e.color)){
            update = filterColor.filter(color => color !== e.color);
        } else {
            update = [...filterColor, e.color];
        }
        setFilterColor(update);
    }    
    
    const filteredShoes = () => {
        const list = [...shoes];
        let colors = [...filterColor];
        let updated = [];

        if(filterColor !== ''){
            for(let c of colors){
                // eslint-disable-next-line
                list.map(shoe => {
                    if(shoe.color.includes(c)){
                        if(!updated.includes(shoe)){
                            updated.push(shoe);
                        };
                    };
                });
            }
            updated.sort((a, b) => a.color.localeCompare(b.color));
        } if(filterColor.length === 0) {
            updated = list;
        };
        return updated;
    }

    const resetFilter = () => {
        setFilterMenu(false);
        setFilterColor([]);
    }

    const filterShoes = () => {
        return(
            <div>
                {filterMenu ? <button className={clearButton} onClick={resetFilter}>Clear Colors</button> 
                : <button className={buttonStyle} onClick={() => setFilterMenu(true)}>Filter By Color</button>}
                {filterMenu && <div className="render-options"> {renderOptions()} </div>}
            </div>
        )
    }
    
    return(
        <div>
            <div className="header-section">
                <div className="title">
                    <h3>Shoes</h3>
                </div>
                <div className="filter-products">
                    {filterShoes()}
                </div>
            </div>
            <div className="product-list">
                {renderShoes()}
            </div>
        </div>
    )
}

export default ShoesContainer