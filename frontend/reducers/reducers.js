var Redux = require("redux")
var appReducer = require("./App.jsx")
var headerReducer = require("./Header.jsx")
var bodyReducer = require("./Body.jsx")
var footerReducer = require("./Footer.jsx")
var loginReducer = require("./Login.jsx")
var homeReducer = require("./Home.jsx")
var uploadSCReducer = require("./UploadSC.jsx")
var playerReducer = require("./Player.jsx")
var likesReducer = require("./Likes.jsx")


function authorReducer(state = {author: "victor"}, action) {
  switch(action.type) {
    case 'UPDATE_AUTHOR':
      return {
        ...state,
        author: action.name
      };
    default:
      return state;
  }
}

function counterReducer(state = {counter: 3}, action) {
  switch(action.type) {
    case 'INCREMENT_COUNTER':
      return {
        ...state,
        counter: state.counter+1
      };
    case 'DECREMENT_COUNTER':
      return {
        ...state,
        counter: state.counter-1
      };
    default:
      return state;
  }
}

const todoReducer = Redux.combineReducers({
  counterReducer,
  authorReducer,
  headerReducer,
  bodyReducer,
  footerReducer,
  loginReducer,
  homeReducer,
  appReducer,
  uploadSCReducer,
  playerReducer,
  likesReducer,
})


var store = Redux.createStore(todoReducer);
module.exports = store;