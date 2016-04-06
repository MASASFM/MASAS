
var SignUpForm = {}

// Which part of the Redux global state does our component want to receive as props?
SignUpForm.mapStateToProps = function(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
SignUpForm.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: 'Sign-up', pageType: '0'})
	}
}

module.exports = SignUpForm
