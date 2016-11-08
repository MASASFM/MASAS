import {
	updateEditProfileTextboxValues,
} from "../../../reducers/actions/Profile.js"

var ProfileEdit = {}

ProfileEdit.mapStateToProps = function(state) {
	return {
		textboxValues: state.profileReducer.textboxValues,
		userData: state.appReducer.userData,
	}
}

ProfileEdit.mapDispatchToProps = function(dispatch) {
	return {
		updateTextboxValues: (textboxValues) => dispatch(updateEditProfileTextboxValues(textboxValues))
	}
}

module.exports = ProfileEdit
