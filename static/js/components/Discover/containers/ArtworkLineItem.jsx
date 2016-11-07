import {
	resumePlayer
} from "../../../reducers/actions/Player.js"

var ArtworkLineItem = {}

ArtworkLineItem.mapStateToProps = function(state) {
	return {
	}
}

ArtworkLineItem.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		resumePlayer: () => dispatch(resumePlayer()),
	}
}

module.exports = ArtworkLineItem
