import "./breedCards.css";
import React from "react";
import BreedCard from "../BreedCard/BreedCard.jsx";

const BreedCards = ({ breeds }) => {

  return (
    <div className="breed-cards">
    { 
      breeds.map((breed) => {
        return (
          <BreedCard 
            key={breed.name}
            id={breed.id}
            img={breed.img}
            source={breed.source}
            name={breed.name}
            weight={breed.weight}
            temperaments={breed.temperaments}
          />
        );
      })
    }
    </div>
  )
};


export default BreedCards;
