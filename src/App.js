import React, { Suspense, lazy, createContext, useReducer } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from "./components/Header";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

import { initialState, reducer } from './components/reducer/UseReducer';

const Home = lazy(() => import('./components/Home'));
const Categories = lazy(() => import('./components/Categories'));

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="shoping_wrap">
      <BrowserRouter>
        <UserContext.Provider value={{state, dispatch}}>
          <div className='product_body'>
            <Header />
            <Suspense fallback={<div className="loader">Loading...</div>}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/categories/:id" element={<Categories />} />
              </Routes>
            </Suspense>
          </div>
          <Cart />
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
