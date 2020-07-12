import React, { useContext, useState } from 'react';
import '../Styling/ProductList.css';
import ProductList from '../Components/ProductList';
import FilterOptionsForm from '../Components/FilterOptionsForm';
import { FaveBottomsContext } from '../Context/FaveBottoms';
import { BottomsContext } from '../Context/Bottoms';
import { CurrentUserContext } from '../Context/CurrentUser';


const BottomsContainer = () => {
    const abortController = new AbortController();

    const faveBottomsUrl = 'https://boiling-reaches-37131.herokuapp.com/favorite_bottoms';
    const [currentUser] = useContext(CurrentUserContext);
    const [faveBottoms, setFaveBottoms] = useContext(FaveBottomsContext);
    const [bottoms] = useContext(BottomsContext);

    const [filterColor, setFilterColor] = useState('');
    const [filterMenu, setFilterMenu] = useState(false);

    const buttonStyle = "btn btn-outline-info btn-sm";
    const clearButton = "btn btn-outline-secondary btn-sm";

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
        .then(res => setFaveBottoms([...faveBottoms, res]));
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

    const renderBottoms = () => {
        const list = filteredBottoms();
        const faveBottoms = faveBottomsId();
        return list.map(bottom => {
            return <ProductList 
                key={bottom.id} 
                product={bottom} 
                favorite={faveBottoms.includes(bottom.id) ? true: false}
                addFavorite={addFavorite} 
                removeFavorite={removeFavorite}
            />
        });
    }

    const colorsObject = () => {
        let list = [...bottoms];
        let options = [];
        let optionsObject = {};

        for(let i = 0; i < list.length; i++){
            let bottom = (list[i].color).split(" ")
            for(let j = 0; j < bottom.length; j++){
                let color = bottom[j];
                options.push(color);
            }
        }

        options.sort((a, b) => a.localeCompare(b));
        for(let color of options){
           if(optionsObject[color]){
            optionsObject[color]++
           } else {
            optionsObject[color] = 1
           };
        } 
        return optionsObject
    }
    
    const colorsOptions = () => {
        const colors = colorsObject();
        let list = [];

        for(const [color, amount] of Object.entries(colors)){
            list.push({color, amount})
        }

        return list
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
    
    const filteredBottoms = () => {
        const list = [...bottoms];
        let colors = [...filterColor];
        let updated = [];

        if(filterColor !== ''){
            for(let c of colors){
                // eslint-disable-next-line
                list.map(bottom => {
                    if(bottom.color.includes(c)){
                        if(!updated.includes(bottom)){
                            updated.push(bottom)
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

    const filterBottoms = () => {
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
                    <h3>Bottoms</h3>
                </div>
                <div className="filter-products">
                    {filterBottoms()}
                </div>
            </div>
            <div className="product-list">
                {renderBottoms()}
            </div>
        </div>
    )
}

export default BottomsContainer