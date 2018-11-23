import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

function profileReducer(state={name: "sid"}, action) {
  if (action.type === "NAME_CHANGE") {
    return {name: action.value};
  }
  if (action.type === "NAME_CLEAR") {
    return {name: ""};
  }
  return state;
}

function notificationReducer(state={notifications: []}, action) {
  if (action.type === "NEW_NOTIFICATION") {
    return {notifications: state.notifications.concat(action.value)}
  }
  if (action.type === "NAME_CHANGE") {
    return {notifications: state.notifications.concat("name changed to " + action.value)}  
  }
  return state;
}

let reducer = combineReducers({
  profile: profileReducer,
  notification: notificationReducer
});

let middlewareEnhancer = applyMiddleware(createLogger());
let store = createStore(reducer, middlewareEnhancer);

export default store;
