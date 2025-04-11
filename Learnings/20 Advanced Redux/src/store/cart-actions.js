import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'sending...',
                title: 'Sending Data',
                message: 'We are sending data carefully'
            })
        );

        const sendRequest = async () => {
            const response = await fetch('https://test-react-1d315-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items || [],
                    totalQuantity: cart.totalQuantity
                })
              });
            console.log("🚀 ~ sendCartData ~ response:", response)

            if(!response.ok){
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Failed. :/ Somethings Wrong',
                message: 'There is a error while sending data'
            }));

            return
            
            }
        }

        try {
             await  sendRequest();
             dispatch(uiActions.showNotification({
                status: 'success',
                title: 'success',
                message: 'Sent cart data successfully'
                }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Failed. :/ Somethings Wrong',
                message: 'We will solved as soon as possible'
              }));
        }
    }
};

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://test-react-1d315-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok) {
                throw new Error('Could not fetch cart data');
            }

            const data = await response.json();
            return data
        };
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Fetching data Failed. :/ Somethings Wrong',
                message: 'We will solved as soon as possible'
              }));
        }
    }
}