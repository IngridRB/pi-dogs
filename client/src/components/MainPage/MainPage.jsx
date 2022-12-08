import "./mainPage.css";

import logo from '../img/huella.png';
import fondo from '../img/sinFondo.jpg';

import { Link } from 'react-router-dom';
import React from "react";

const mainPage = () => {
  
  return (
    <div className="container">
     
      <div className="mainPage">
        <h1  className="mainPage-title">
          <img className="logo" height="30" src={logo}  alt="razas" />
          Registro de Razas
          <img className="logo" height="30" src={logo}  alt="razas" />
        </h1>
        <Link to="/home">
          <button className="mainPage-button">HOME</button>
        </Link>
        <img className="mainPage-img" src={fondo} alt="razas" />
      </div>

    </div>
  );
};

export default mainPage;