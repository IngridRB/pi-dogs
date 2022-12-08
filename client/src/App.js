import './App.css';
import {Route} from "react-router-dom";
import MainPage from './components/MainPage/MainPage';
import Home from './components/Home/Home';
import NewBreed from './components/NewBreed/NewBreed';
import BreedDetails from './components/BreedDetails/BreedDetails';

function App() {
  return (
    <div>
      <Route exact path="/">
        <MainPage/>
      </Route>
      <Route exact path="/home" component={Home} />
      <Route exact path="/new/" component={NewBreed} />
      <Route path="/breed/:id/" component={BreedDetails} />
    </div>
  );
}

export default App;
