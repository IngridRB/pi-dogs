import "./breedCards.css";
import React from "react";
import BreedCard from "../BreedCard/BreedCard.jsx";
// import { getBreedDetail } from "../../actions";

const BreedCards = ({ breeds }) => {
  // componentDidMount(dispatch) {
  //   const breedId = breeds.idRaza;
  //   breeds.getBreedDetail(breedId);
  // }

  return (
    <div className="breed-cards">
    { 
      breeds.map((breed) => {
        return (
          <BreedCard 
            key={breed.name}
            id={breed.id}
            img={breed.img}
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

// function mapStateToProps(state) {
//   return {
//     breedDetail: state.breedDetail,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//       getBreedDetail: idRaza => dispatch(getBreedDetail(idRaza)),
//   };
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(BreedCards);
export default BreedCards;
