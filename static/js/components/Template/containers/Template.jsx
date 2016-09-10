
var Template = {}

// Which part of the Redux global state does our component want to receive as props?
Template.mapStateToProps = function(state) {
	return {
		// app state
		
		// page state

		// other states
	}
}

// Which action creators does it want to receive by props?
Template.mapDispatchToProps = function(dispatch) {
	return {
		// higher level state updates
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),

		// page state updates

		// other state updates
	}
}

module.exports = Template
