var { updateProfileInfo } = require('../ajaxCalls.jsx')

var Profile = {}

// Which part of the Redux global state does our component want to receive as props?
Profile.mapStateToProps = function(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
		userData: state.appReducer.userData,
		isEditingProfile: state.profileReducer.isEditingProfile,
		textboxValues: state.profileReducer.textboxValues,
	}
}

// Which action creators does it want to receive by props?
Profile.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		updateProfileInfo,
		toggleEditingProfile: () => dispatch({ type: "TOGGLE_EDITING_PROFILE" })
	}
}

module.exports = Profile
