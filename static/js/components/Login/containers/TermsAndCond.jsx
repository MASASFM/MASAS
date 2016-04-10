
var TermsAndCond = {}

// Which part of the Redux global state does our component want to receive as props?
TermsAndCond.mapStateToProps = function(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
TermsAndCond.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
	}
}

module.exports = TermsAndCond
