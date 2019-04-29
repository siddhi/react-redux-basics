import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import store from './store';
import { Provider, connect } from 'react-redux';

function ProfileEditor(props) {
  let [name, setName] = useState(store.getState().profile.name);
  let [loading, setLoading] = useState(store.getState().pagestate.loading);

  useEffect(() => {
    return store.subscribe(() => {
      setName(store.getState().profile.name);
      setLoading(store.getState().pagestate.loading);
    });
  });

  return (
    <div>
      { loading ? <h3>Loading...</h3> : "" }
      <input onChange={(e) => store.dispatch({type: "NAME_CHANGE", value: e.target.value})} value={name} />
      <button onClick={() => store.dispatch({type: "UNDO"})}>Undo</button>
      <ClearProfile onNameChanged={props.onNameChanged} />
    </div>
  );
}

function ClearProfile(props) {
  return <button onClick={() => props.onNameChanged("anjali")}>Reset</button>
}

let DashboardContainer = connect(
(state) => ({
  name: store.getState().profile.name,
  notifications: store.getState().notification.notifications
})
)(Dashboard);

function Dashboard(props) {
  return (
    <div>
      <Greeting name={props.name} />
      <Message>
        You have <strong>{props.notifications.length}</strong> notifications
      </Message>
      <NotificationPanel notifications={props.notifications} />
    </div>
  );
}

function Message(props) {
  return (
    <div style={{backgroundColor: "green", color:" white", padding: "10px"}}>
      {props.children}
    </div>
  );
}

function NotificationPanel(props) {
  return (
    <ul>
      { props.notifications.map((notification, index) => <li key={index}>{notification}</li>) }
    </ul>
  );
}

function Greeting(props) {
  return <h1>{props.msg} {props.name}</h1>
}

Greeting.defaultProps = {
  msg: "Hi"
}

Greeting.propTypes = {
  name: PropTypes.string,
  msg: PropTypes.string
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
      <Router>
        <div>
          <Route path="/" component={ Menu } />
          <Route exact path="/" component={ ProfileEditor } />
          <Route exact path="/dashboard" component={ DashboardContainer } />
        </div>
      </Router>
    );
  }  
}

ReactDOM.render(<Provider store={store}><Layout /></Provider>, document.getElementById('root'));

