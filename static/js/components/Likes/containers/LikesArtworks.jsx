import {
	changeBgState
} from "../../../reducers/actions/App.js"

import {
	updateNumberLikesShown
} from "../../../reducers/actions/Likes.js"

var LikesArtworks = {}

// Which part of the Redux global state does our component want to receive as props?
LikesArtworks.mapStateToProps = function(state) {
	return {
		bgFilter: state.appReducer.bgFilter,
		userLikesUnfiltered: state.likesReducer.userLikes,
		numRowLikesShown: state.likesReducer.numRowLikesShown
	}
}

// Which action creators does it want to receive by props?
LikesArtworks.mapDispatchToProps = function(dispatch) {
	return {
		updateNumberLikesShown: number => dispatch(updateNumberLikesShown(number)),
		blurBg: (blur) => dispatch(changeBgState.blur(blur)),
		saturateBg: (sat) => dispatch(changeBgState.saturate(sat)),
		blurBgMobile: (blur) => dispatch(changeBgState.blurMobile(blur)),
		saturateBgMobile: (sat) => dispatch(changeBgState.saturateMobile(sat)),
	}
}

module.exports = LikesArtworks
