import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

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

let middlewareEnhancer = applyMiddleware(thunk, createLogger());
let store = createStore(reducer, middlewareEnhancer);

function saveName(newName) {
  return (dispatch) => {
    dispatch({type: "NAME_LOADING"});
    setTimeout(() => dispatch({type: "NAME_CHANGE", value: newName}), 5000);
  }
}

store.dispatch(saveName("varsha"));

export default store;
