const initialState = {
  breedsLoaded: [],
  filteredBreeds: [],
  tempersLoaded: [],
  breedDetail: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === "GET_BREEDS") {
    return {
      ...state,
      breedsLoaded: action.payload,
      filteredBreeds: action.payload,
    };
  }

  if (action.type === "FILTER_BREEDS") {
    const filteredBreeds = state.breedsLoaded.filter((breed) => {
      return (
        (action.payload.temperament === 'all' || breed.temperaments?.includes(action.payload.temperament)) &&
        (action.payload.origin === 'all' || breed.source === action.payload.origin)
      );
    }).sort(
      (breedA, breedB) => {
        if (action.payload.sortBy === 'weight-asc' || action.payload.sortBy === 'weight-desc') {
          const weightA = breedA.weight.split('-');
          const weightB = breedB.weight.split('-');
          return action.payload.sortBy === 'weight-asc' ? (
            parseInt(weightA[0]) - parseInt(weightB[0])
          ) : (
            parseInt(weightB[0]) - parseInt(weightA[0])
          );
        }
        if (action.payload.sortBy === 'alpha-asc' || action.payload.sortBy === 'alpha-desc') {
          return action.payload.sortBy === 'alpha-asc' ? (
            breedA.name.localeCompare(breedB.name)
          ) : (
            breedB.name.localeCompare(breedA.name)
          );
        }
        return 0;
      }
    );
    return {
      ...state,
      filteredBreeds,
    };
  }

  if (action.type === "GET_TEMPERS") {
    return {
      ...state,
      tempersLoaded: action.payload,
    };
  }

  if (action.type === "GET_BREED_DETAILS") {
    return {
      ...state,
      breedDetail: action.payload,
    };
  }

  return state;
}

export default rootReducer;