
var ChangeMoodModal = {}

// Which part of the Redux global state does our component want to receive as props?
ChangeMoodModal.mapStateToProps = function(state) {
	return {
		moodValue: state.profileReducer.changeSongMoodValue,
		MASASuser: state.appReducer.MASASuser,
	}
}

// Which action creators does it want to receive by props?
ChangeMoodModal.mapDispatchToProps = function(dispatch) {
	return {
		updateMoodValue: (discoverNumber) => dispatch({type:'UPDATE_SONG_MOOD_MODAL_VALUE', discoverNumber }),
	}
}

module.exports = ChangeMoodModal

