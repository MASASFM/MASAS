import {
	resumePlayer
} from "../../../reducers/actions/Player.js"

import {
	updatePageTitle,
	updateMiniProfileContent,
} from "../../../reducers/actions/App.js"

var ArtworkLineItem = {}

ArtworkLineItem.mapStateToProps = function(state) {
	return {
	}
}

ArtworkLineItem.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		resumePlayer: () => dispatch(resumePlayer()),
		updateMiniProfileContent: userApiURL => dispatch(updateMiniProfileContent(userApiURL))
	}
}

module.exports = ArtworkLineItem
