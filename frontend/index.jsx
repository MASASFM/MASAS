var React = require("react")
var ReactDOM = require("react-dom")
var ReactRedux = require("react-redux")

var store = require("./reducers/reducers.js")

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory

// var TestComponent = require('./TestComponent.jsx');
// var Home = require('./routes/containers/test.jsx');

var App = require('./routes/containers/App.jsx')
var Login = require('./routes/containers/Login/LoginForm.jsx')
var SignUp = require('./routes/containers/Login/SignUp.jsx')
var UploadSC = require('./routes/containers/UploadSC/UploadSC.jsx')
var SoundcloudCallback = require('./SoundcloudCallback.jsx')
var Profile = require('./routes/containers/Profile/Profile.jsx')
var Likes = require('./routes/containers/Likes/Likes.jsx')
var Discover = require('./routes/containers/Discover/Discover.jsx')

// var routes = (
//   // <ReactRedux.Provider store={store}>
//   //              <Router history={browserHistory}>
//                        <Route path="/" component={App}>
//                                <Route path="discover" component={Discover} />
//                                <Route path="login" component={Login} />
//                                <Route path="sign-up" component={SignUp} />
//                                <Route path="sc-sync" component={UploadSC} />
//                                <Route path="profile" component={Profile} />
//                                <Route path="likes" component={Likes} />
//                        </Route>
//                        // <Route path="/sc-callback" component={SoundcloudCallback} />
//        //         </Router>
//        // </ReactRedux.Provider>
//        )

// // var router = Router.create({
// //   routes: routes,
// //   location: Router.historyLocation
// // })
// console.log("Router =>", Router)
// Router.run(routes, Router.hashHistory, (Root) => {
//   React.render(<Root/>, document.getElementById('content'))
// })

// later
// React.unmountComponentAtNode(document.body);

// <Route path="*" component={NoMatch}/>      // 404
ReactDOM.render((
       <ReactRedux.Provider store={store}>
               <Router history={browserHistory}>
                       <Route path="/" component={App}>
                               <Route path="discover" component={Discover} />
                               <Route path="login" component={Login} />
                               <Route path="sign-up" component={SignUp} />
                               <Route path="sc-sync" component={UploadSC} />
                               <Route path="profile" component={Profile} />
                               <Route path="likes" component={Likes} />
                       </Route>
                       <Route path="/sc-callback" component={SoundcloudCallback} />

               </Router>
       </ReactRedux.Provider>
), document.getElementById('content'))