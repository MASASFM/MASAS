var { logout } = require("../../../MASAS_functions.jsx")

var NavSidebar = {}

NavSidebar.mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
	}
}

NavSidebar.mapDispatchToProps = function(dispatch) {
	return {
		toogleSidebar: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		logout: logout.bind(null,dispatch),
		closeModal: () => dispatch({ type: 'CLOSE_AND_EMPTY_MAIN_MODAL' }),
		updateModalContent: (modalContent, modalType) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent, modalType }),
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
	}
}

module.exports = NavSidebar
