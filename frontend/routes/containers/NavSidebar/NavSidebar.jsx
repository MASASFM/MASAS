var ReactRedux = require("react-redux")
var NavSidebar = require('../../components/NavSidebar/NavSidebar.jsx')

var {logout} = require("../../../MASAS_functions.jsx")

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		MASASuser: state.appReducer.MASASuser
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		toogleSidebar: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		logout: logout.bind(null,dispatch)
	}
}

NavSidebar = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(NavSidebar)
module.exports = NavSidebar
