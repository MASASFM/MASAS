let ReactRedux = require("react-redux")
let { browserHistory } = require('react-router')

let HeaderDropdown = require('../../components/Header/HeaderDropdown.jsx')
const { getUsername } = require('./ajaxCalls.jsx')

var { logout } = require("../../../MASAS_functions.jsx")


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		// userLoggedIn: state.appReducer.userLoggedIn,
		username: state.headerReducer.username
	}
}


// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {

	return {
		dispatch,
		logout: logout.bind(null, dispatch),
		getUsername: getUsername
	}
}

HeaderDropdown = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDropdown)
module.exports = HeaderDropdown
