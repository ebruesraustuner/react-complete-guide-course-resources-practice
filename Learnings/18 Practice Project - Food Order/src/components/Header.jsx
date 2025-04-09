import { useState, useContext } from 'react'
import logo from '../assets/logo.jpg'
import Cart from './Cart';
import CartContext from '../store/CartContext.jsx';


export function Header() {
  const [isCartOpening, setCardOpening] = useState(false);
  const cartCtx = useContext(CartContext);

  function handleDialogCart(){
    setCardOpening(isCartOpening => !isCartOpening);
  }

  const cardItemCounts = cartCtx.items && cartCtx.items.length > 0 ? cartCtx.items.map((item) => item.count).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0) : 0

    return (
        <>
            <header id="main-header">
                <div id="title">
                  <img src={logo} alt="React food logo" />
                  <h1>ReactFood</h1>
                </div>
                <nav>
                  <button className='text-button' onClick={handleDialogCart}>Cart ({cardItemCounts})</button>
                </nav>
                {isCartOpening && <Cart handleCloseDialog={handleDialogCart}/>}
            </header>
        </>
    )
}