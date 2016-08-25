
var ProfileEdit = {}

ProfileEdit.mapStateToProps = function(state) {
	return {
		textboxValues: state.profileReducer.textboxValues,
		userData: state.appReducer.userData,
	}
}

ProfileEdit.mapDispatchToProps = function(dispatch) {
	return {
		updateTextboxValues: (textboxValues) => dispatch({ type: "UPDATE_EDIT_PROFILE_TEXTBOX_VALUES", textboxValues })
	}
}

module.exports = ProfileEdit
