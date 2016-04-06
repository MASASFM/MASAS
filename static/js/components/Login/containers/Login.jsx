
var Login = {}

// Which part of the Redux global state does our component want to receive as props?
Login.mapStateToProps = function(state) {
	return {
		title: state.appReducer.pageTitle,
	}
}

// Which action creators does it want to receive by props?
Login.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: () => dispatch({type:'UPDATE_PAGE_TITLE', title: 'Login', pageType: 0})
	}
}

module.exports = Login
