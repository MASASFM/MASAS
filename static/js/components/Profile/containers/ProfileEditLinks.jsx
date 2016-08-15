
var ProfileEditLinks = {}

// Which part of the Redux global state does our component want to receive as props?
ProfileEditLinks.mapStateToProps = function(state) {
	return {
		textboxValues: state.profileReducer.textboxValues,
	}
}

// Which action creators does it want to receive by props?
ProfileEditLinks.mapDispatchToProps = function(dispatch) {
	return {
		updateTextboxValues: (textboxValues) => dispatch({ type: "UPDATE_EDIT_PROFILE_TEXTBOX_VALUES", textboxValues })
	}
}

module.exports = ProfileEditLinks
