var SplashScreen = {}

// Which part of the Redux global state does our component want to receive as props?
SplashScreen.mapStateToProps = function(state) {
	return {
		splashScreenPage: state.appReducer.splashScreenPage,
	}
}

// Which action creators does it want to receive by props?
SplashScreen.mapDispatchToProps = function(dispatch) {
	return {
		updateSplashScreenPage: (splashScreenPage) => dispatch({ type: 'CHANGE_SLASH_SCREEN_PAGE', splashScreenPage })
	}
}

module.exports = SplashScreen
