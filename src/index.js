import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "anjali"
    }
  }

  render() {
    return (
      <div>
        <Greeting name={this.state.name} />
        <ProfileEditor 
          name={this.state.name}
          onNameChanged={(newName) => this.setState({name: newName})} />
      </div>
    );
  }
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

ReactDOM.render(<Profile />, document.getElementById('root'));

