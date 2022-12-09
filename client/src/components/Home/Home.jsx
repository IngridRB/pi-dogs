import "./home.css";
import logo from '../img/huella.png';
import search from '../img/search.png';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import BreedCards from "../BreedCards/BreedCards";
import { getBreeds, getTempers, filterBreeds } from "../../actions";
import { connect } from "react-redux";

const Home = ({ filteredBreeds, filterBreeds, getBreeds, tempers, getTempers }) => {

  const [filterState, setFilterState] = useState({
    temperament: 'all',
    origin: 'all',
    sortBy: 'all',
  });

  const [inputState, setInputState] = useState('');

  function handleInputChange(e) {
    setInputState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getBreeds(inputState.trim());
  }

  function filterResults() {
    filterBreeds(filterState.temperament, filterState.origin, filterState.sortBy);
  }

  function handleFiltersChange(e) {
    setFilterState({
      ...filterState,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    getBreeds();
    getTempers();
  }, []);

  useEffect(() => {
    filterResults();
  }, [filterState])

  return (
    <div className="">
      <header className="box-header">
        <Link to="/" >         
          <img className="logo" height="60" src={logo}  alt="razas" />
        </Link>
        <nav className="navbar">
          <form className="search" onSubmit={(e) => handleSubmit(e)} action="" method="get">
            <input type="text" placeholder="Buscar razas" onChange={handleInputChange}/>
            <button type="submit"><img src={search}/></button>
          </form>
          <NavLink to="/new/" >          
            <button className="create-button">Nueva Raza</button>
          </NavLink>
        </nav>
      </header>
      
      <main className="main-cards">
        <div className="box-filter">
          <div className="filter">
            <select className="filter-button n1" defaultValue={'all'} name="temperament" onChange={handleFiltersChange}>
              <option value='all'>Filtrar por Temperamentos:</option>
              {
                tempers.map((temper) => (
                  <option key={temper.id} value={temper.name}>{temper.name}</option>
                ))
              }
            </select>
            <select className="filter-button n2" defaultValue={'all'} name="origin" onChange={handleFiltersChange}>
              <option value="all">Filtrar por Origen:</option>
              <option value="api">API</option>
              <option value="db">Base de Datos</option>
            </select>
            <select className="filter-button n3" defaultValue={'all'} name="sortBy" onChange={handleFiltersChange}>
              <option value="all">Ordenar por: </option>
              <option value="alpha-asc">Orden Alfabético Ascendente</option>
              <option value="alpha-desc">Orden Alfabético Descendente</option>
              <option value="weight-asc">Peso Ascendente</option>
              <option value="weight-desc">Peso Descendente</option>
            </select>
          </div>
        </div>

        <BreedCards
          breeds={filteredBreeds}
        />
      </main>

    </div>
  );
};

function mapStateToProps(state) {
  return {
    breeds: state.breedsLoaded,
    tempers: state.tempersLoaded,
    filteredBreeds: state.filteredBreeds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBreeds: (name) => dispatch(getBreeds(name)),
    getTempers: () => dispatch(getTempers()),
    filterBreeds: (temperament, origin, sortBy) => dispatch(filterBreeds(temperament, origin, sortBy)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);