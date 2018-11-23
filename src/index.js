import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Hello() {
  return (
    <div>Hello, <World /></div>
  );
}

function World() {
  return (
    <div>World</div>
  );
}

ReactDOM.render(<Hello />, document.getElementById('root'));

