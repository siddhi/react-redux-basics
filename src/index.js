import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { ThemeContext } from './contexts';

let Dashboard = React.lazy(() => import('./dashboard'));

class LoadError extends React.Component {
  constructor() {
    super();
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    return (
      <div>
        { this.state.error ? "Error loading page. Please reload" : this.props.children }
      </div>
    );
  }
}

function useLoading() {
  let [isLoading, setLoading] = useState(store.getState().pagestate.loading);
  useEffect(() => store.subscribe(() => {
    setLoading(store.getState().pagestate.loading);
  }));

  return isLoading;
}

function ProfileEditor(props) {
  let [name, setName] = useState(store.getState().profile.name);
  let isLoading = useLoading();

  useEffect(() => {
    return store.subscribe(() => {
      setName(store.getState().profile.name);
    });
  });

  return (
    <div>
      { isLoading ? <h3>Loading...</h3> : "" }
      <input onChange={(e) => store.dispatch({type: "NAME_CHANGE", value: e.target.value})} value={name} />
      <button onClick={() => store.dispatch({type: "UNDO"})}>Undo</button>
      <ClearProfile onNameChanged={(newName) => store.dispatch({type: "NAME_CHANGE", value: newName})} />
    </div>
  );
}

function ClearProfile(props) {
  return <button onClick={() => props.onNameChanged("anjali")}>Reset</button>
}

function Menu() {
  return (
    <div>
      <Link to="/">Profile</Link> | <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

class Layout extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={{background: "red", color: "white"}}>
      <Router>
        <LoadError>
          <Route path="/" component={ Menu } />
          <Route exact path="/" component={ ProfileEditor } />
          <React.Suspense fallback={<div>Loading page...</div>}>
            <Route exact path="/dashboard" component={ Dashboard } />
          </React.Suspense>
        </LoadError>
      </Router>
      </ThemeContext.Provider>
    );
  }  
}

ReactDOM.render(<Provider store={store}><Layout /></Provider>, document.getElementById('root'));

