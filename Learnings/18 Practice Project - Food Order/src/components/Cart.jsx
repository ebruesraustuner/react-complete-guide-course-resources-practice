import { useContext, useState } from 'react';
import CartContext from '../store/CartContext.jsx';
import { CheckOut } from './CheckOut.jsx';
import { currencyFormatter } from '../util/formatting.js';


export default function Cart({handleCloseDialog}) {
    const cartCtx = useContext(CartContext);
    const cartItems = cartCtx.items.map(item => {
        return {
            ...item,
            totalPrice: item.count * Number(item.price)
        }
    });

    const [isCheckout, setIsCheckout] = useState(false);

    const CartTotal = cartItems.map(item => item.totalPrice).reduce((acc, curr) => acc + curr, 0)

    function handleRemoveItem(meal) {
        cartCtx.removeItem(meal)
    }

    function handleAddItem(meal){
        cartCtx.addItem(meal)
    }

    function handleCheckout(){
        if(cartItems.length > 0) {
            setIsCheckout(isCheckout => !isCheckout)
        }
    }


    return (
        <>
            {!isCheckout && (
            <dialog open className="modal cart ">
                <section className="cart">
                    <h2>
                        Your Cart
                    </h2>
                    <ul className="cart">
                        {cartItems.length === 0 && 'Henüz Yemek Seçimi Yapmadınız'}
                        {cartItems && cartItems.length > 0 && (
                            cartItems.map((item, i) => (
                                <li key={i} className="cart-item">
                                    <p>{item.name} - {item.count}</p>
                                    <p>{currencyFormatter.format(item.price)}</p>
                                    <div className="modal-actions">
                                        <button className='text-button' onClick={() => handleRemoveItem(item)}> - </button>
                                        <p>{item.count}</p>
                                        <button  className='text-button' onClick={() => handleAddItem(item)}> + </button>
                                    </div> 
                                </li>
                            ))
                        )}
                        
                    </ul>
                    <div className="cart-total">
                        {currencyFormatter.format(CartTotal)}
                    </div>
                    <div className="modal-actions">
                        <button className='text-button' onClick={handleCloseDialog}>Close</button>
                        <button className='button' disabled={cartItems.length === 0} onClick={handleCheckout}>Go To Checkout</button>
                    </div>
                </section>
            </dialog>
            )}
            {isCheckout && <CheckOut />}
        </>
    )
} 