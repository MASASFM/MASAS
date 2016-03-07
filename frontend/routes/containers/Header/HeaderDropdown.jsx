var ReactRedux = require("react-redux")
var HeaderDropdown = require('../../components/Header/HeaderDropdown.jsx')
var {browserHistory} = require('react-router')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userLoggedIn: state.appReducer.userLoggedIn,
	}
}

var logout = (dispatch) => {
	dispatch({type: 'LOGOUT'})
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		logout: logout.bind(null, dispatch),
	}
}

var HeaderDropdown = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDropdown)
module.exports = HeaderDropdown;
