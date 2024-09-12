import React from 'react';
import { Route, Routes } from "react-router-dom";
import Albums from '../Pages/Albums/Albums';
import Home from '../Pages/Home/Home';
import Artiste from '../Pages/Artistes/Artistes';
import Genres from '../Pages/Genres/Genres';
import DetailAlbum from '../Pages/DetailAlbum/DetailAlbum';

function Router() {
    return (
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/albums' element={<Albums/>} />
          <Route path="/albums/:id" element={<DetailAlbum />} />
          <Route path='/artistes' element={<Artiste/>} />
          <Route path='/genres' element={<Genres/>} />
        </Routes>
    );
}

export default Router;
