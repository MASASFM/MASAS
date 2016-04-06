var { logout } = require("../../../MASAS_functions.jsx")

var NavSidebar = {}

// Which part of the Redux global state does our component want to receive as props?
NavSidebar.mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		MASASuser: state.appReducer.MASASuser
	}
}

// Which action creators does it want to receive by props?
NavSidebar.mapDispatchToProps = function(dispatch) {
	return {
		toogleSidebar: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		logout: logout.bind(null,dispatch)
	}
}

module.exports = NavSidebar
