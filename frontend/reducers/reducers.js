var Redux = require("redux")
var { appReducer } = require("./App.jsx")
var { headerReducer } = require("./Header.jsx")
var { bodyReducer } = require("./Body.jsx")
var { footerReducer } = require("./Footer.jsx")
var { loginReducer } = require("./Login.jsx")
var { homeReducer } = require("./Home.jsx")
var { uploadSCReducer } = require("./UploadSC.jsx")
var { playerReducer } = require("./Player.jsx")
var { likesReducer } = require("./Likes.jsx")

const todoReducer = Redux.combineReducers({
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


var store = Redux.createStore(todoReducer)
module.exports = store