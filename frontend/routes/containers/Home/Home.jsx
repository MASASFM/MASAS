
var ReactRedux = require("react-redux")
var Home = require('../../components/Home/Home.jsx')
var {browserHistory} = require('react-router')

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
  	user: state.appReducer.MASASuser,
  }
}



// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
  	goToLogin: () => {
	browserHistory.push('/login')
}
  }
}

var Home = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
module.exports = Home
