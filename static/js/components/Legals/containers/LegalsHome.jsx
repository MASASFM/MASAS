
var LegalsHome = {}

// Which part of the Redux global state does our component want to receive as props?
LegalsHome.mapStateToProps = function(state) {
	return {
		pageNumber: state.legalsReducer.pageNumber,
	}
}

// Which action creators does it want to receive by props?
LegalsHome.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		goToPage: (pageNumber) => dispatch({ type: 'TOOGLE_LEGALS_PAGE_NUMBER', pageNumber})
	}
}

module.exports = LegalsHome
