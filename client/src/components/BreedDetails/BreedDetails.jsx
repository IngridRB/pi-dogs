import "./breedDetails.css";
import { Link, useParams } from 'react-router-dom';
import React from "react";
import { getBreedDetail } from "../../actions";
import { connect } from "react-redux";

const BreedDetails = ({ breed, getBreedDetail }) => {

  const { id } = useParams();

  React.useEffect(() => {
    getBreedDetail(id);
  }, []);

  return (
    <div className="container-details">
      <div className="card-details">
        <div className="box-close"> 
          <Link to="/home" >          
            <button>x</button>
          </Link>
        </div>
        {
          breed.error !== undefined ? (
            <div>{breed.error}</div>
          ) : (
            <div>
              { breed.img ? <img class="" src={breed.img} alt="Imagen de la raza" /> : '' }
              <div className="card-body">
                <h2 className="card-title">{breed.name}</h2>
                <p>Altura: <span className="card-text"> {breed.height} </span></p>
                <p>Peso: <span className="card-text"> {breed.weight} </span></p>
                <p>Años de vida: <span className="card-text"> {breed.years_life} </span></p>
                <p>Temperamentos: <span className="card-text"> {breed.temperaments} </span></p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    breed: state.breedDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBreedDetail: (id) => dispatch(getBreedDetail(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreedDetails);
