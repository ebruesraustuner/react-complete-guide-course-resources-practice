import { Header } from "./components/Header";
import { Meals } from "./components/Meals";
import { useState } from "react";
import { CartContextProvider } from "./store/CartContext";

function App() {
  
  return (
    <>
      <h1>You got this 💪</h1>
      <CartContextProvider>
        <Header/>
        <Meals/>
      </CartContextProvider>
    </>
  );
}

export default App;
