import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useContext } from 'react';

import { fetchMeals } from "../http.js";
import Errorpage from "./Errorpage.jsx";
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';


export function Meals(){
    const cartCtx = useContext(CartContext);

    const { isFetching:isLoading, error, fetchedData:meals } = useFetch(fetchMeals, [], true)
    console.log("🚀 ~ Meals ~ error:", error)
    if (error) {
        return <Errorpage title="An error occurred!" message={error.message}/>
    }
    function onAddingCart(meal){
        console.log("🚀 ~ onAddingCart ~ meal:", meal)
        cartCtx.addItem(meal);
    }


    return (
        <section>
            {isLoading && 'Yemekler Yükleniyor'}
            {!isLoading && meals.length === 0  && 'üzgünüz bir şeyler ters gitti'}
            {!isLoading && meals.length > 0 && (
                <ul id="meals">
                    {meals.map((meal, i) => (
                        <li key={i} className="meal-item">
                        <article>
                            <img src={`http://localhost:3000/${meal.image}`}  alt={meal.name}/>
                            <div>
                                <h3>{meal.name}</h3>
                                <p className="meal-item-price"> {currencyFormatter.format(meal.price)} </p>
                                <p className="meal-item-description">
                                        {meal.description}
                                </p>
                            </div>
                            
                            <div className="meal-item-actions">
                                <button className="button" onClick={() => onAddingCart(meal)}>Add to Cart</button>
                            </div>
                        </article>
                    </li>
                    ))}
                    
                </ul>
            )}
            
        </section>
    )
}