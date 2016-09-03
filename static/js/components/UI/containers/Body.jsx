var Body = {}


// Which part of the Redux global state does our component want to receive as props?
Body.mapStateToProps = function(state) {
	return {
		title: state.appReducer.pageTitle,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

// Which action creators does it want to receive by props?
Body.mapDispatchToProps = function(dispatch) {
	return {
		// updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType})
	}
}

module.exports = Body
