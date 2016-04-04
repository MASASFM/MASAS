
var ReactRedux = require("react-redux")
var App = require('../components/App.jsx')

var {logInWithToken} = require("../../MASAS_functions.jsx")

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		processingAuthCookie: state.appReducer.processingAuthCookie
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		onIncrement: () => dispatch({type:'INCREMENT_COUNTER'}),
		onDecrement: () => dispatch({type:'DECREMENT_COUNTER'}),
		onSetNavSidebarOpen: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		logInWithToken: (authToken) => logInWithToken(dispatch, authToken),
		forceRender: () => dispatch({type:'DONE_PROCESSING_AUTH_COOKIE'}),
		showAppFetchingBar: () => dispatch({ type: 'SET_APP_FETCHING_STATE_TRUE' }),
		hideAppFetchingBar: () => dispatch({ type: 'SET_APP_FETCHING_STATE_FALSE' }),
	}
}

App = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
module.exports = App
