import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import store from './store';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: store.getState().profile.name
    }
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(this.update);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  update() {
    this.setState({name: store.getState().profile.name});
  }

  setName(newName) {
    store.dispatch({type: "NAME_CHANGE", value: newName});
  }

  render() {
    return <ProfileEditor name={this.state.name} onNameChanged={this.setName} />
  }
}

function ProfileEditor(props) {
  return (
    <div>
      <input onChange={(e) => props.onNameChanged(e.target.value)} value={props.name} />
      <ClearProfile onNameChanged={props.onNameChanged} />
    </div>
  );
}

function ClearProfile(props) {
  return <button onClick={() => props.onNameChanged("anjali")}>Reset</button>
}

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: store.getState().profile.name,
      notifications: store.getState().notification.notifications
    };
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(this.update);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  update() {
    this.setState({
      name: store.getState().profile.name,
      notifications: store.getState().notification.notifications
    });
  }

  render() {
    return <Dashboard name={this.state.name} notifications={this.state.notifications} />
  }
}

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

ReactDOM.render(<Layout />, document.getElementById('root'));

