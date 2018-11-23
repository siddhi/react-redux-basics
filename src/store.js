import { createStore } from 'redux';

function reducer(state={name: "anjali"}, action) {
  console.log("reducer", state, action);
  if (action.type === "NAME_CHANGE") {
    return {name: action.value};
  }
  return state;
}

let store = createStore(reducer);

store.subscribe(() => console.log("store changed", store.getState()));

store.dispatch({type: "NAME_CHANGE", value: "anand"});
store.dispatch({type: "NAME_CHANGE", value: "varsha"});

export default store;
