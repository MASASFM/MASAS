
// var ReactRedux = require("react-redux")
// var App = require('../components/App.jsx')

var { logInWithToken } = require("../../../MASAS_functions.jsx")

var App = {}

// Which part of the Redux global state does our component want to receive as props?
App.mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		processingAuthCookie: state.appReducer.processingAuthCookie,
		isModalOpened: state.appReducer.isModalOpened,
		modalContent: state.appReducer.modalContent
	}
}

// Which action creators does it want to receive by props?
App.mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		onIncrement: () => dispatch({type:'INCREMENT_COUNTER'}),
		onDecrement: () => dispatch({type:'DECREMENT_COUNTER'}),
		onSetNavSidebarOpen: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		logInWithToken: (authToken) => logInWithToken(dispatch, authToken),
		forceRender: () => dispatch({type:'DONE_PROCESSING_AUTH_COOKIE'}),
		showAppFetchingBar: () => dispatch({ type: 'SET_APP_FETCHING_STATE_TRUE' }),
		hideAppFetchingBar: () => dispatch({ type: 'SET_APP_FETCHING_STATE_FALSE' }),
	}
}

module.exports = App
