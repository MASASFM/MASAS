
var ReactRedux = require("react-redux")
var App = require('../components/App.jsx')

var {logInWithToken} = require("../../MASAS_functions.jsx")

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		value: state.counterReducer.counter,
		author: state.authorReducer.author,
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		onIncrement: () => dispatch({type:'INCREMENT_COUNTER'}),
		onDecrement: () => dispatch({type:'DECREMENT_COUNTER'}),
		onSetNavSidebarOpen: () => dispatch({type:'TOOGLE_NAV_SIDEBAR'}),
		logInWithToken: (authToken) => logInWithToken(dispatch, authToken)
	}
}

var App = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
module.exports = App;
