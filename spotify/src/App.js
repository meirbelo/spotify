import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import './Components/Header/Header.css';
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import { BrowserRouter } from 'react-router-dom'; // Importer BrowserRouter
import Router from './Router/Router'; // Assurez-vous que le chemin est correct

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
