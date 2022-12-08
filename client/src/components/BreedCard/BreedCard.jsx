import "./breedCard.css";
// import { NavLink } from 'react-router-dom';
import React from "react";

const BreedCard = ({ img, name, weight, temperaments}) => {
  
  return (
    // <NavLink to="/breed/:id">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{name}</h3>
          <p>Peso:<span className="card-parameter"> {weight} </span></p>
          <p>Temperamentos: <span className="card-parameter">{temperaments}</span></p>
        </div>
        { img ? <img className="card-img" src={img} alt="Imagen de la raza" /> : '' }
      </div>
    // </NavLink>
  );
};

export default BreedCard;