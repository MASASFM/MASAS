
var LikesWrapper = {}

// Which part of the Redux global state does our component want to receive as props?
LikesWrapper.mapStateToProps = function(state) {
	return {
		title: state.appReducer.pageTitle,
	}
}

// Which action creators does it want to receive by props?
LikesWrapper.mapDispatchToProps = function(dispatch) {
	return {
		
	}
}

module.exports = LikesWrapper
