import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

function profileReducer(state={name: "sid"}, action) {
  if (action.type === "NAME_CHANGE") {
    return {name: action.value};
  }
  if (action.type === "NAME_CLEAR") {
    return {name: ""};
  }
  if (action.type === "UNDO") {
    return action.value.profile;
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
  if (action.type === "UNDO") {
    return action.value.notification;
  }
  return state;
}

function pageStateReducer(state={loading: false}, action) {
  if (action.type === "NAME_LOADING") {
    return {loading: true};
  }
  if (action.type === "NAME_CHANGE") {
    return {loading: false};
  }
  return state;
}

let reducer = combineReducers({
  profile: profileReducer,
  notification: notificationReducer,
  pagestate: pageStateReducer
});

let previousState = {};
let undoMiddleware = (store) => (next) => (action) => {
  if (action.type === "UNDO") {
    action.value = previousState;
  }
  previousState = store.getState();
  next(action);
}

let middlewareEnhancer = applyMiddleware(undoMiddleware, thunk, createLogger());
var reduxDevtoolsEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
let enhancers = compose(middlewareEnhancer, reduxDevtoolsEnhancer);
let store = createStore(reducer, enhancers);

function saveName(newName) {
  return (dispatch) => {
    dispatch({type: "NAME_LOADING"});
    setTimeout(() => dispatch({type: "NAME_CHANGE", value: newName}), 5000);
  }
}

store.dispatch(saveName("varsha"));

export default store;
