import {
	changeSplashScreenPage,
	closeAndEmptyMainModal,
} from "../../../reducers/actions/App.js"

var SplashScreen = {}

// Which part of the Redux global state does our component want to receive as props?
SplashScreen.mapStateToProps = function(state) {
	return {
		splashScreenPage: state.appReducer.splashScreenPage,
		MASASuser: state.appReducer.MASASuser,
	}
}

// Which action creators does it want to receive by props?
SplashScreen.mapDispatchToProps = function(dispatch) {
	return {
		updateSplashScreenPage: (splashScreenPage) => dispatch(changeSplashScreenPage(splashScreenPage)),
		closeSplashScreen: () => dispatch(closeAndEmptyMainModal()),

	}
}

module.exports = SplashScreen
