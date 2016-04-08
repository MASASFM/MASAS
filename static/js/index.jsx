var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var store = require("./reducers/reducers.js")

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory

var SoundcloudCallback = require('./SoundcloudCallback.jsx')

var App = require('./components/App/App.jsx')
var Login = require('./components/Login/LoginForm.jsx')
var SignUp = require('./components/Login/SignUp.jsx')
var UploadSC = require('./components/UploadSC/UploadSC.jsx')
var Profile = require('./components/Profile/Profile.jsx')
var Likes = require('./components/Likes/Likes.jsx')
var Discover = require('./components/Discover/Discover.jsx')
var Legals = require('./components/Legals/LegalsHome.jsx')

// <Route path="*" component={NoMatch}/>      // 404
ReactDOM.render((
       <ReactRedux.Provider store={store}>
               <Router history={browserHistory}>
                       <Route path="/" component={App}>
                               <Route path="discover" component={Discover} />
                               <Route path="login" component={Login} />
                               <Route path="sign-up" component={SignUp} />
                               <Route path="upload" component={UploadSC} />
                               <Route path="profile" component={Profile} />
                               <Route path="likes" component={Likes} />
                               <Route path="legals" component={Legals} />
                       </Route>
                       <Route path="/sc-callback" component={SoundcloudCallback} />

               </Router>
       </ReactRedux.Provider>
), document.getElementById('content'))