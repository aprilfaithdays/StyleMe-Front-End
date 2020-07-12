import React, { useContext, useState } from 'react';
import '../Styling/ProductList.css';
import ProductList from '../Components/ProductList';
import FilterOptionsForm from '../Components/FilterOptionsForm';
import { FaveTopsContext } from '../Context/FaveTops';
import { TopsContext } from '../Context/Tops';
import { CurrentUserContext } from '../Context/CurrentUser';


const TopsContainer = () => {
    const abortController = new AbortController();

    const faveTospUrl = 'https://boiling-reaches-37131.herokuapp.com/favorite_tops';
    const [currentUser] = useContext(CurrentUserContext);
    const [faveTops, setFaveTops] = useContext(FaveTopsContext);
    const [tops] = useContext(TopsContext);

    const [filterColor, setFilterColor] = useState('');
    const [filterMenu, setFilterMenu] = useState(false);

    const buttonStyle = "btn btn-outline-info btn-sm";
    const clearButton = "btn btn-outline-secondary btn-sm";

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

    const renderTops = () => {
        const list = filteredTops();
        const faveTopsIdList = faveTopsId();
        return list.map(top => {
            return <ProductList 
                key={top.id} 
                product={top} 
                favorite={faveTopsIdList.includes(top.id) ? true: false}
                addFavorite={addFavorite} 
                removeFavorite={removeFavorite}
            />
        });
    }

    const colorsObject = () => {
        let list = [...tops];
        let options = [];
        let optionsObject = {};

        for(let i = 0; i < list.length; i++){
            let top = (list[i].color).split(" ")
            for(let j = 0; j < top.length; j++){
                let color = top[j];
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
        };
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
        let update;
        if(filterColor.includes(e.color)){
            update = filterColor.filter(color => color !== e.color);
        } else {
            update = [...filterColor, e.color];
        }
        setFilterColor(update);
    }    
    
    const filteredTops = () => {
        const list = [...tops];
        let colors = [...filterColor];
        let updated = [];

        if(filterColor !== ''){
            for(let c of colors){
                // eslint-disable-next-line
                list.map(top => {
                    if(top.color.includes(c)){
                        if(!updated.includes(top)){
                            updated.push(top);
                        };
                    };
                });
            };
            updated.sort((a, b) => a.color.localeCompare(b.color));
        } if(filterColor.length === 0) {
            updated = list;
        }
        return updated;
    }

    const resetFilter = () => {
        setFilterMenu(false);
        setFilterColor([]);
    }

    const filterTops = () => {
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
                    <h3>Tops</h3>
                </div>
                <div className="filter-products">
                    {filterTops()}
                </div>
            </div>
            <div className="product-list">
                {renderTops()}
            </div>
        </div>
    )
}

export default TopsContainer