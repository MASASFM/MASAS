var { toggleSongLike } = require("../../../MASAS_functions.jsx")

var Discover = {}

// Which part of the Redux global state does our component want to receive as props?
Discover.mapStateToProps = function(state) {
	return {
		discoverNumber: state.discoverReducer.discoverNumber,
		userToken: state.appReducer.MASASuser,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
	}
}

// Which action creators does it want to receive by props?
Discover.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		handleTimePickerChange: (discoverNumber) => dispatch({ type: 'CHANGE_DISCOVER_NUMBER', discoverNumber}),
	}
}

module.exports = Discover