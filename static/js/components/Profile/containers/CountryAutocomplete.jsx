var CountryAutocomplete = {}

// Which part of the Redux global state does our component want to receive as props?
CountryAutocomplete.mapStateToProps = function(state) {
	return {
		userCity: state.appReducer.userData.city
	}
}

// Which action creators does it want to receive by props?
CountryAutocomplete.mapDispatchToProps = function(dispatch) {
	return {
	}
}

module.exports = CountryAutocomplete
