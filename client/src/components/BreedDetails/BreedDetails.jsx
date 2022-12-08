import "./breedDetails.css";
import { Link } from 'react-router-dom';
import React from "react";
import { getBreedDetail } from "../../actions";
// import { useDispatch, useSelector } from 'react-redux';

const breedDetails = ({ img, name, height_min, height_max, weight_min, weight_max, years_life, tempers }) => {
//   const dispatch = useDispatch();
//   const breedDetail = useSelector((state) => state.breedDetail);

//   React.useEffect(() => {
//     dispatch(getBreedDetail(props.match.params.id));
// }, []);

  return (
    <div className="container-details">
      <div className="card-details">
        <div className="box-close"> 
          <Link to="/home" >          
          <button>x</button>
          </Link>
        </div>
        { img ? <img class="" src={img} alt="Imagen de la raza" /> : '' }
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Altura mínima: {height_min}</p>
          <p className="card-text">Altura máxima: {height_max}</p>
          <p className="card-text">Peso mínimo: {weight_min}</p>
          <p className="card-text">Peso máximo: {weight_max}</p>
          <p className="card-text">Años de vida: {years_life}</p>
          <p className="card-text">Temperamentos: {tempers}</p>
        </div>
      </div>

      {/* {breedDetail.breeds &&
       breedDetail.breeds.map((e) => <breedDetail key={e.id} {...e} />)} */}
    </div>

  );
};

export default breedDetails;