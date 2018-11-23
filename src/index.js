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
        <h1>Hello {this.state.name}</h1>
        <input onChange={(e) => this.setState({name: e.target.value})} value={this.state.name} />
      </div>
    );
  }
}

ReactDOM.render(<Profile />, document.getElementById('root'));

