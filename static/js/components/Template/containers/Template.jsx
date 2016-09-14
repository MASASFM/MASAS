
var Template = {}

Template.mapStateToProps = function(state) {
	return {
	}
}

Template.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
	}
}

module.exports = Template
