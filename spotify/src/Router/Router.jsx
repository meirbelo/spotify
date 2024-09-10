import React from 'react';
import { Route, Routes } from "react-router-dom";
import Albums from '../Pages/Albums/Albums';
import Home from '../Pages/Home/Home';
import Artiste from '../Pages/Artistes/Artistes';
import Genres from '../Pages/Genres/Genres';

function Router() {
    return (
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/albums' element={<Albums/>} />
          <Route path='/artistes' element={<Artiste/>} />
          <Route path='/genres' element={<Genres/>} />
        </Routes>
    );
}

export default Router;
