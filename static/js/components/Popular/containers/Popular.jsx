
var Popular = {}

Popular.mapStateToProps = function(state) {
	return {
	}
}

Popular.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
	}
}

module.exports = Popular
