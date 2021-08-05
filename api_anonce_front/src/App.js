import './App.css';
import Home from './components/home';
import Header from './components/header';
import Formulaire from './components/formulaire';
import Admin from './components/admin';
import Detail from './components/detail';
import Edit from './components/edit';
import RequireData from './helpers/require-data'
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Header/>
       <Switch>
        <Route exact path="/" component={RequireData(Home)} />
        {/* //on rajouter RequireData() des hooks pour rajouter getAll produit dans tous les pages*/}
        <Route exact path="/form" component={Formulaire} />
        <Route exact path="/admin" component={RequireData(Admin)} />
        <Route exact path="/detail/:id" component={RequireData(Detail)} />
        <Route exact path="/edit/:id" component={RequireData(Edit)} />
      </Switch>
    </div>
  );
}

export default App;
