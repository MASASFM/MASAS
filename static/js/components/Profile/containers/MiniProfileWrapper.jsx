import {
	updatePageTitle,
	updateMiniProfileContent,
	updateMiniProfileVisibility,
	updateMiniProfileSCsongInfo
} from "../../../reducers/actions/App.js"

import {
	updateProfileBackArrowFunc,
} from "../../../reducers/actions/Profile.js"

var MiniProfileWrapper = {}

MiniProfileWrapper.mapStateToProps = function(state) {
	return {
		miniProfile: state.appReducer.miniProfile,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

MiniProfileWrapper.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		updateMiniProfileVisibility: isVisible => dispatch(updateMiniProfileVisibility(isVisible)),
		updateMiniProfileContent: userData => dispatch(updateMiniProfileContent(userData)),
		updateProfileBackArrowFunc: func => dispatch(updateProfileBackArrowFunc(func)),
		updateSCsongInfo: () => dispatch(updateMiniProfileSCsongInfo()),
	}
}

module.exports = MiniProfileWrapper
