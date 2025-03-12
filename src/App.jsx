import React from "react";
import store from "./store/store";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
