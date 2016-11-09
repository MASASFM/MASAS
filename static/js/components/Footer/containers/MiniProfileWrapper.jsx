import {
	updatePageTitle,
	updateMiniProfileContent,
	updateMiniProfileVisibility
} from "../../../reducers/actions/App.js"

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
		updateMiniProfileContent: userData => dispatch(updateMiniProfileContent(userData))
	}
}

module.exports = MiniProfileWrapper
