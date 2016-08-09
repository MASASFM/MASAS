
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
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent }),
		toogleHashtag: (hashtagNumber) => dispatch({ type: "TOOGLE_HASHTAG_FILTER", hashtagNumber }),
	}
}

module.exports = FiltersModal
