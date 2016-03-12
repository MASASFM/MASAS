let ReactRedux = require("react-redux")
let { browserHistory } = require('react-router')

let HeaderDropdown = require('../../components/Header/HeaderDropdown.jsx')
const { getUsername } = require('./ajaxCalls.jsx')


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
	var logout = () => {
		dispatch({type: 'LOGOUT'})
	}

	// var getUsername = (MASASuser) => {
	// 	console.log(MASASuser)
	// 	var header = "Bearer " + MASASuser
	// 	$.ajax({
	// 		type: "GET",
	// 		url: 'api/check-user/',	
	// 		headers: {
	// 			"Authorization": header,
	// 		},
	// 		success: (data) => {
	// 			console.log(data)
	// 			var username = data.user
	// 			if (username.length > 13)
	// 				username = username.substr(0,13) + "..."

	// 			// document.getElementById('username-header').innerHTML = username
	// 			dispatch({type:'SET_USERNAME', username: username})
	// 		},
	// 		error: (err) => {
	// 			console.log(err)
	// 		},
	// 	})
	// }

	return {
		dispatch,
		logout: logout,
		getUsername: getUsername
	}
}

HeaderDropdown = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderDropdown)
module.exports = HeaderDropdown
