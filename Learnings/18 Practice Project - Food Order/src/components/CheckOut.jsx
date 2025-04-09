import { useContext, useState } from 'react';
import CartContext from '../store/CartContext.jsx';
import {postOrders } from '../http.js'
import { useFetch } from "../hooks/useFetch";
export function CheckOut(){
    const cartCtx = useContext(CartContext);
    const orderMeals = cartCtx.items;
    const [payload, setPayload] = useState()
    const { isFetching:isLoading, error, fetchedData:meals, sendRequest } = useFetch(null, [], null)
    console.log("🚀 ~ CheckOut ~ isLoading:", isLoading)
    

    async function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log("🚀 ~ handleSubmit ~ data:", data)
        const payloadToSet = JSON.stringify({
            order: {
                items: orderMeals,
                customer: data
            }
        })
        setPayload(payloadToSet)
        sendRequest(postOrders(payload), payloadToSet)

    }

    return (
        <dialog open className="modal">
            <form onSubmit={handleSubmit}>
                <span className="control">
                    <label>Full Name</label>
                    <input type="text" label="fullName" id="name" name="name" required></input>
                </span>
                <span className="control">
                    <label>E - mail Address</label>
                    <input type="text" id="email" label="email" name="email" required></input>
                </span>
                <span className="control">
                    <label>Street</label>
                    <input type="text" id="street" label="street" name="street" required></input>
                </span>
                <div className="control-row">
                    <span className="control">
                        <label>Posta Code</label>
                        <input type="text" id="postal-code" label="postalCode" name="postalCode" required></input>
                    </span>
                    <span className="control">

                        <label>Şehir</label>
                        <input type="text" id="city" label="city" name="city" required></input>
                    </span>
                </div>
                <div className="modal-actions">
                    <button className="text-button">Close</button>
                    <button type="submit" className="button">Submit Order</button>
                </div>
            </form>
        </dialog>
    )
}