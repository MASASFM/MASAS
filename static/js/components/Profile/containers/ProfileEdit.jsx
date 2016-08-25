
var ProfileEdit = {}

// Which part of the Redux global state does our component want to receive as props?
ProfileEdit.mapStateToProps = function(state) {
	return {
		textboxValues: state.profileReducer.textboxValues,
		userData: state.appReducer.userData,
	}
}

// Which action creators does it want to receive by props?
ProfileEdit.mapDispatchToProps = function(dispatch) {
	return {
		updateTextboxValues: (textboxValues) => dispatch({ type: "UPDATE_EDIT_PROFILE_TEXTBOX_VALUES", textboxValues })
	}
}

module.exports = ProfileEdit
