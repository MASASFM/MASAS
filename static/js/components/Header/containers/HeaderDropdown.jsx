import { closeAndEmptyMainModal } from "../../../reducers/actions/App.js"

// let ReactRedux = require("react-redux")
// let { browserHistory } = require('react-router')

// const { getUsername } = require('../ajaxCalls.jsx')

var { logout } = require("../../../MASAS_functions.jsx")

var HeaderDropdown = {}

// Which part of the Redux global state does our component want to receive as props?
HeaderDropdown.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		// userLoggedIn: state.appReducer.userLoggedIn,
		// username: state.appReducer.userData.user
		userData: state.appReducer.userData,
		isModalOpened: state.appReducer.isModalOpened,
	}
}


// Which action creators does it want to receive by props?
HeaderDropdown.mapDispatchToProps = function(dispatch) {

	return {
		dispatch,
		logout: logout.bind(null, dispatch),
		updateModalContent: (modalContent, modalType) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent, modalType }),
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
	}
}

module.exports = HeaderDropdown
