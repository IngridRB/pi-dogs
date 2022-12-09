import "./newBreed.css";

import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { getTempers } from "../../actions";
import { connect } from "react-redux";

const NewBreed = ({ tempers, getTempers }) => {
  const [state, setState] = React.useState({
    name: '',
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    years_life: 0,
    temperaments: [],
    new_temperaments: '',
  });

  const [submissionState, setSubmissionState] = React.useState({
    message: '',
    status: 'pending',
  });

  const [validationsState, setValidationsState] = React.useState([]);

  useEffect(() => {
    getTempers();
  }, []);
 
  function handleSubmit(e) {
    e.preventDefault();

    const errors = [];
    if (!(/^[a-zA-Z]/.test(state.name))) {
      errors.push('El nombre solo debe contener letras.');
    }
    // No permitir números negativos también, validarlo.
    if (state.height_min < 1) {
      errors.push('La altura mínima no puede ser menor o igual a cero.');
    }
    if (state.height_max < 1) {
      errors.push('La altura máxima no puede ser menor o igual a cero.');
    }
    if (state.weight_min < 1) {
      errors.push('El peso mínimo no puede ser menor o igual a cero.');
    }
    if (state.weight_max < 1) {
      errors.push('El peso máximo no puede ser menor o igual a cero.');
    }
    if (state.years_life < 1) {
      errors.push('Los años de vida no pueden ser menor o igual a cero.');
    }
    if (state.height_min > state.height_max) {
      errors.push('La altura mínima debe ser menor a la altura máxima.');
    }
    if (state.weight_min > state.weight_max) {
      errors.push('El peso mínimo debe ser menor que el peso máximo.');
    }
    if (state.temperaments.length === 0 && state.new_temperaments.length === 0) {
      errors.push('Debes ingresar o seleccionar al menos un temperamento para esta raza.');
    }
    
    if (errors.length !== 0) {
      setSubmissionState({
        status: 'failed',
        message: 'Error! Se encontraron errores de validación.',
      }); 
      setValidationsState(errors);
      return;
    }

    const params = state;
    fetch('http://localhost:3001/dogs/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then(response => response.json())
    .then((json) => {
      setSubmissionState({
        status: 'successful',
        message: 'Éxito! La raza fue creada con éxito.',
      });
    })
    .catch((error) => {
      setSubmissionState({
        status: 'failed',
        message: `Error! Hubo un problema al crear la raza. ${error}`,
      }); 
      // Vas a mostrar un cuadro que dice "Hubo un error al guardar la raza. Intente nuevamente".
    });
  }

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  function handleChangeTemperaments(e) {
    const values = [...e.target.selectedOptions].map((el) => el.value);
    setState({
      ...state,
      temperaments: values,
    });
  }
  
  return (
    <div className="container-newBreed">
      {
        (submissionState.status === 'pending') ? (
          <div className="newBreed">
            <form onSubmit={handleSubmit}>
              <h2 className="newBreed-title">Crear una raza</h2>
              <div>
                <div className="newBreed-input">
                  <label>Nombre: </label>
                  <input type="text" name="name" placeholder="Raza" required onChange={handleChange}/>
                </div>
                <div className="newBreed-input">
                  <label>Altura mínima: </label>
                  <input type="number"  name="height_min" placeholder="Altura en cm" required onChange={handleChange}/>
                </div>
                <div className="newBreed-input">
                  <label>Altura máxima: </label>
                  <input type="number"  name="height_max" placeholder="Altura en cm" required onChange={handleChange}/>
                </div>
                <div className="newBreed-input">
                  <label>Peso mínimo: </label>
                  <input type="number" min="0" name="weight_min" placeholder="Peso en kg" required onChange={handleChange}/>
                </div>
                <div className="newBreed-input">
                  <label>Peso máximo: </label>
                  <input type="number" min="0" name="weight_max" placeholder="Peso en kg" required onChange={handleChange}/>
                </div>
                <div className="newBreed-input">
                  <label>Años de vida: </label>
                  <input type="number" min="0" name="years_life" placeholder="Años de vida" required onChange={handleChange}/>
                </div>
                <div className="newBreed-input">
                  <select className="" name="temperaments" defaultValue={null} multiple onChange={handleChangeTemperaments}>
                    <option value="">Temperamentos:</option>
                    {
                      tempers.map((temper) => <option value={temper.name} key={temper.name}>{temper.name}</option>)
                    }
                  </select>
                </div>
                <div className="newBreed-input">
                  <label>Nuevos Temperamentos: </label>
                  <textarea type="text" name="new_temperaments" rows="2" onChange={handleChange} placeholder="Ingresa los temperamentos solo sí no existen en la lista, separados por comas."></textarea>
                </div>
                <div  className="newBreed-buttons">
                  <Link to="/home" >         
                    <button type="" className="newBreed-button">Cancelar</button>
                  </Link>
                  <button type="submit" className="newBreed-button">Crear Raza</button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className={submissionState.status === 'successful' ? 'submission-success' : 'submission-failed'}>
            <span> { submissionState.message } </span>
            <p> Click {
              (submissionState.status === 'successful') ? (
                <Link to="/home/">aquí</Link>
              ) : (
                <a href="/new/">aquí</a>
              )
            } para continuar.</p>
            <div>
              { (validationsState.length > 0) && (
                  <ul className="validation"> 
                    {
                      validationsState.map((error) => <li key={error}>{error}</li>)
                    }
                  </ul>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    tempers: state.tempersLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTempers: () => dispatch(getTempers()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBreed);