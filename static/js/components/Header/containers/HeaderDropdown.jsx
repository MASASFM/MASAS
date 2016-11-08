import {
	closeAndEmptyMainModal,
	changeModalContent,
	toogleIsModalOpened
} from "../../../reducers/actions/App.js"

var { logout } = require("../../../MASAS_functions.jsx")

var HeaderDropdown = {}

HeaderDropdown.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		// userLoggedIn: state.appReducer.userLoggedIn,
		// username: state.appReducer.userData.user
		userData: state.appReducer.userData,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

HeaderDropdown.mapDispatchToProps = function(dispatch) {

	return {
		dispatch,
		logout: logout.bind(null, dispatch),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
	}
}

module.exports = HeaderDropdown
