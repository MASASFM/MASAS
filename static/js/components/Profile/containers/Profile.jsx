// var { updateProfileInfo } = require('../ajaxCalls.jsx')

import {
	toggleEditingProfile,
	updateUserSCSongs,
	updatePublicProfileInfo,
	updateProfileInfo,
	getPublicProfileInfo,
	getSCinfo,
	saveProfile,
	updateProfileBackArrowFunc
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
		userSCSongs: state.profileReducer.userSCSongs,
		backArrowFunc: state.profileReducer.backArrowFunc,
	}
}

// Which action creators does it want to receive by props?
Profile.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType, backArrowFunc) => dispatch(updatePageTitle(title, pageType, backArrowFunc)),
		updateProfileInfo: () => dispatch(updateProfileInfo()),
		toggleEditingProfile: () => dispatch(toggleEditingProfile()),
		updatePublicProfileInfo: publicProfileInfo => dispatch(updatePublicProfileInfo(publicProfileInfo)),
		updateUserSCSongs: userSCSongs => dispatch(updateUserSCSongs(userSCSongs)),
		getPublicProfileInfo: (userPk) => dispatch(getPublicProfileInfo(userPk)),
		getSCinfo: () => dispatch(getSCinfo()),
		saveProfile: (getCookie) => dispatch(saveProfile(getCookie)),
		resetBackArrowFunc: () => dispatch(updateProfileBackArrowFunc(null))
	}
}

module.exports = Profile
