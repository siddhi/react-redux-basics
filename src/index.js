import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProfileContainer extends React.Component {
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
    return <Profile name={this.state.name} onNameChanged={this.setName} />
  }
}

function Profile(props) {
  return (
    <div>
      <Greeting name={props.name} />
      <ProfileEditor 
        name={props.name}
        onNameChanged={props.onNameChanged} />
    </div>
  );
}

function Greeting(props) {
  return <h1>Hello {props.name}</h1>
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

ReactDOM.render(<ProfileContainer />, document.getElementById('root'));

