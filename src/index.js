import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import store from './store';

class ProfileContainer extends React.Component {
  render() {
    return <ProfileEditor name={this.props.name} onNameChanged={this.props.onNameChanged} />
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
  constructor() {
    super();
    this.state = {
      name: "anjali"
    }
    this.setName = this.setName.bind(this);
  }

  setName(name) {
    this.setState({name});
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={ Menu } />
          <Route exact path="/" render={() => <ProfileContainer name={this.state.name} onNameChanged={this.setName} />} />
          <Route exact path="/dashboard" render={() => <Greeting name={this.state.name} /> } />
        </div>
      </Router>
    );
  }  
}

ReactDOM.render(<Layout />, document.getElementById('root'));

