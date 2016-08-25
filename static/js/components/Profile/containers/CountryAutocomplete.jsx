var CountryAutocomplete = {}

CountryAutocomplete.mapStateToProps = function(state) {
	return {
		userCity: state.appReducer.userData.city
	}
}

CountryAutocomplete.mapDispatchToProps = function(dispatch) {
	return {
	}
}

module.exports = CountryAutocomplete
