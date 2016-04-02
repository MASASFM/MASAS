var ReactRedux = require("react-redux")
var ArtworkLine = require('../../components/Discover/ArtworkLine.jsx')

var { toggleSongLike } = require("../../../MASAS_functions.jsx")


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		discoverNumber: state.discoverReducer.discoverNumber,
		history: state.discoverReducer.history,
		songPlaying: state.playerReducer.songPlaying,
		isPlayerPaused: state.playerReducer.isPaused,
		isSongPlayingLiked: state.playerReducer.isSongPlayingLiked,
		userToken: state.appReducer.MASASuser,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		// updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		// handleTimePickerChange: (discoverNumber) => dispatch({ type: 'CHANGE_DISCOVER_NUMBER', discoverNumber}),
		toggleSongLike: (userToken, songId) => toggleSongLike(dispatch, userToken, songId),
	}
}

var ArtworkLine = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtworkLine)
module.exports = ArtworkLine
