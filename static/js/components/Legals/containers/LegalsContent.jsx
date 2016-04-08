
var LegalsContent = {}

// Which part of the Redux global state does our component want to receive as props?
LegalsContent.mapStateToProps = function(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
LegalsContent.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, backArrowFunc) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: 1, backArrowFunc}),
		goToHome: () => dispatch({ type: 'TOOGLE_LEGALS_PAGE_NUMBER', pageNumber: 0})
	}
}

module.exports = LegalsContent
