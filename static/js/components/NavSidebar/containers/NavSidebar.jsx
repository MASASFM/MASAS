import {
	closeAndEmptyMainModal,
	toogleIsModalOpened,
	toogleNavSidebar,
	changeModalContent,
} from "../../../reducers/actions/App.js"
var { logout } = require("../../../MASAS_functions.jsx")

var NavSidebar = {}

NavSidebar.mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

NavSidebar.mapDispatchToProps = function(dispatch) {
	return {
		toogleSidebar: () => dispatch(toogleNavSidebar()),
		logout: logout.bind(null,dispatch),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
	}
}

module.exports = NavSidebar
