
var UnsplashControls = {}

// Which part of the Redux global state does our component want to receive as props?
UnsplashControls.mapStateToProps = function(state) {
	return {
		unsplashArtistUsername: state.homeReducer.unsplashArtistUsername,
		unsplashArtistName: state.homeReducer.unsplashArtistName,
		backgroundURL: state.homeReducer.backgroundURL,
	}
}

// Which action creators does it want to receive by props?
UnsplashControls.mapDispatchToProps = function(dispatch) {
	return {
		updateUnsplashArtist: (name, username, url) => dispatch({ type: 'CHANGE_UNSPLASH_ARTIST', unsplashArtistUsername: username, unsplashArtistName: name, backgroundURL: url }),
		updateBackgroundURL: (url) => dispatch({ type: 'CHANGE_BACKGROUND', backgroundURL: url }),
	}
}

module.exports = UnsplashControls
