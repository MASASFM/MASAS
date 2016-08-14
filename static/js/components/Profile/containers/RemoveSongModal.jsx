var RemoveSongModal = {}

// Which part of the Redux global state does our component want to receive as props?
RemoveSongModal.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
	}
}

// Which action creators does it want to receive by props?
RemoveSongModal.mapDispatchToProps = function(dispatch) {
	return {
		
	}
}

module.exports = RemoveSongModal
