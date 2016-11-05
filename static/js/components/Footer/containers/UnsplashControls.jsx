import {
	changeUnsplashArtist,
	getNewBackground,
} from "../../../reducers/actions/Home.js"

var UnsplashControls = {}

// Which part of the Redux global state does our component want to receive as props?
UnsplashControls.mapStateToProps = function(state) {
	return {
		unsplashArtistUsername: state.homeReducer.unsplashArtistUsername,
		unsplashArtistName: state.homeReducer.unsplashArtistName,
		backgroundURL: state.homeReducer.backgroundURL,
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
	}
}

// Which action creators does it want to receive by props?
UnsplashControls.mapDispatchToProps = function(dispatch) {
	return {
		updateUnsplashArtist: () => dispatch(changeUnsplashArtist()),
		updateBackgroundURL: () => dispatch(getNewBackground()),
	}
}

module.exports = UnsplashControls
