import { createStore, combineReducers } from 'redux';

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

let store = createStore(reducer);

store.subscribe(() => console.log("store changed", store.getState()));

store.dispatch({type: "NAME_CHANGE", value: "anand"});
store.dispatch({type: "NEW_NOTIFICATION", value: "Message from sid"});
store.dispatch({type: "NAME_CHANGE", value: "varsha"});

export default store;
