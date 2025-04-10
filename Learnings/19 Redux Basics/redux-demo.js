const redux = require('redux');

const counterReducer = (state = { counter: 0}, action) => {
    console.log("🚀 ~ counterReducer ~ action:", action)
    if(action.type === 'increment') {
        return {counter: state.counter + 1};
    }

    if(action.type === 'decrement') {
        return {counter: state.counter - 1};
    }
}

const store = redux.createStore(counterReducer);
console.log("🚀 ~ store:", store.getState())


const counterSubscriber = () => {
   const latestState=  store.getState();
   console.log("🚀 ~ counterSubscriber ~ latestState:", latestState)
}

store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment'});

store.dispatch({ type: 'decrement'});