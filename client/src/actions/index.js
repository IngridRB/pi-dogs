export function getBreeds(name) {
  return function(dispatch) {
    return fetch(
      name ? `http://localhost:3001/dogs/?name=${name}` : "http://localhost:3001/dogs/",
      {
        method: 'GET',
      })
      .then(response => response.json())
      .then(json => {
          dispatch({
            type: "GET_BREEDS",
            payload: json,
          });
      });
  };
}

export function filterBreeds(temperament, origin, sortBy) {
  return {
    type: "FILTER_BREEDS",
    payload: {
      temperament,
      origin,
      sortBy,
    }
  };
}

export function getTempers() {
  return function(dispatch) {
    return fetch(`http://localhost:3001/temperaments/`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
          console.log(json);
          dispatch({
            type: "GET_TEMPERS",
            payload: json,
          });
      });
  };
}

export function getBreedDetail(idRaza) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/dogs/${idRaza}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_BREED_DETAILS", payload: json });
      });
  }
}
