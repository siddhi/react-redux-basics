import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import store from './store';
import { Provider, connect } from 'react-redux';

let ProfileContainer = connect(
(state) => ({
  name: state.profile.name,
  loading: state.pagestate.loading
}),
(dispatch) => ({
  onNameChanged: (newName) => dispatch({type: "NAME_CHANGE", value: newName})
})
)(ProfileEditor);

function ProfileEditor(props) {
  return (
    <div>
      { props.loading ? <h3>Loading...</h3> : "" }
      <input onChange={(e) => props.onNameChanged(e.target.value)} value={props.name} />
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
      <NotificationPanel notifications={props.notifications} />
    </div>
  );
}

function NotificationPanel(props) {
  return (
    <ul>
      { props.notifications.map((notification) => <li>{notification}</li>) }
    </ul>
  );
}

function Greeting(props) {
  return <h1>Hello {props.name}</h1>
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
          <Route exact path="/" component={ ProfileContainer } />
          <Route exact path="/dashboard" component={ DashboardContainer } />
        </div>
      </Router>
    );
  }  
}

ReactDOM.render(<Provider store={store}><Layout /></Provider>, document.getElementById('root'));

