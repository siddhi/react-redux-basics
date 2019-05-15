import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeContext } from './contexts';
import store from './store';

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
  let theme = useContext(ThemeContext);

  return (
    <div style={{ ...theme, padding: "10px" }}>
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

let DashboardContainer = connect(
(state) => ({
  name: store.getState().profile.name,
  notifications: store.getState().notification.notifications
})
)(Dashboard);

export default DashboardContainer;
