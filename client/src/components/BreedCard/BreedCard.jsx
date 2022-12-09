import "./breedCard.css";
import { Link } from 'react-router-dom';
import React from "react";

const BreedCard = ({ id, img, source, name, weight, temperaments}) => {
  
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p>Peso:<span className="card-parameter"> {weight} </span></p>
        <p>Temperamentos: <span className="card-parameter">{temperaments}</span></p>
      </div>
      <Link to={source === 'api' ? `/breed/${name}/` : `/breed/${id}/`}>Ver más</Link>
      { img ? <img className="card-img" src={img} alt="Imagen de la raza" /> : '' }
    </div> 
  );
};

export default BreedCard;