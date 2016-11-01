// var { updateProfileInfo } = require('../ajaxCalls.jsx')

import {
	toggleEditingProfile,
	updateUserSCSongs,
	updatePublicProfileInfo,
	updateProfileInfo,
} from "../../../reducers/actions/Profile.js"

import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"

var Profile = {}

// Which part of the Redux global state does our component want to receive as props?
Profile.mapStateToProps = function(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
		userData: state.appReducer.userData,
		isEditingProfile: state.profileReducer.isEditingProfile,
		textboxValues: state.profileReducer.textboxValues,
		publicProfileInfo: state.profileReducer.publicProfileInfo,
		userSCSongs: state.profileReducer.userSCSongs
	}
}

// Which action creators does it want to receive by props?
Profile.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		updateProfileInfo: () => dispatch(updateProfileInfo()),
		toggleEditingProfile: () => dispatch(toggleEditingProfile()),
		updatePublicProfileInfo: publicProfileInfo => dispatch(updatePublicProfileInfo(publicProfileInfo)),
		updateUserSCSongs: userSCSongs => dispatch(updateUserSCSongs(userSCSongs)),
	}
}

module.exports = Profile
