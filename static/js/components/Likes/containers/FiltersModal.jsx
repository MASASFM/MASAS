import {
	toogleIsModalOpened,
	changeModalContent
} from "../../../reducers/actions/App.js"

import {
	toogleHashtagFilter,
} from "../../../reducers/actions/Likes.js"

var FiltersModal = {}

// Which part of the Redux global state does our component want to receive as props?
FiltersModal.mapStateToProps = function(state) {
	return {
		hashtagFilter: state.likesReducer.hashtagFilter,
	}
}

// Which action creators does it want to receive by props?
FiltersModal.mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		toogleHashtag: hashtagNumber => dispatch(toogleHashtagFilter(hashtagNumber)),
	}
}

module.exports = FiltersModal
