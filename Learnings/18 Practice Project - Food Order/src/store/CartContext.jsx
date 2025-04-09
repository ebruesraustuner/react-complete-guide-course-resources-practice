import { act, createContext, useReducer } from 'react';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartItemsEdit(state, action){
    const prevsMeals = [...state.items];

    if(action.type === 'Add_Item'){
        const countPlusArr = prevsMeals.map((pre) => { return pre.id === action.item.id ? {...pre, count: pre.count++} : { ...pre}});
        const newArr = prevsMeals.some((prevMeal) => prevMeal.id === action.item.id) ? countPlusArr : [...prevsMeals, {...action.item, count: 1}]

        return {...state, items: newArr}

    }

    if(action.type === 'Remove_Item'){
        console.log("🚀 ~ newArr ~ prevsMeals:", prevsMeals)

        const newArr = prevsMeals.map((pre) => {
            return pre.id === action.item.id ?  {
                ...pre,
                count: pre.count - 1
            } : {...pre}
        })
        console.log("🚀 ~ newArr ~ newArr:", newArr)

        return {...state, items: newArr}
    }


}

export function CartContextProvider({ children}){
      const [cart, dispatchCartAction] = useReducer(cartItemsEdit, { items: [] });
      const cartContext = {
        items: cart.items,
        addItem,
        removeItem
      };

      function addItem(item) {
        dispatchCartAction({ type: 'Add_Item', item });
      }

      function removeItem(item) {
        dispatchCartAction({ type: 'Remove_Item', item });
      }
    
      return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
      );
}

export default CartContext;