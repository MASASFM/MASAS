var Profile = {}

// Which part of the Redux global state does our component want to receive as props?
Profile.mapStateToProps = function(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk
	}
}

// Which action creators does it want to receive by props?
Profile.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType})
	}
}

module.exports = Profile
