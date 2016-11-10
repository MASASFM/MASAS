import {
	updateMiniProfileSCsongInfo,
} from "../../../reducers/actions/App.js"

var MiniProfile = {}

MiniProfile.mapStateToProps = function(state) {
	return {
		miniProfile: state.appReducer.miniProfile,
	}
}

MiniProfile.mapDispatchToProps = function(dispatch) {
	return {
		updateSCsongInfo: () => dispatch(updateMiniProfileSCsongInfo()),
	}
}

module.exports = MiniProfile
