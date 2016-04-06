var UploadSCItem = {}

// Which part of the Redux global state does our component want to receive as props?
UploadSCItem.mapStateToProps = function(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
UploadSCItem.mapDispatchToProps = function(dispatch) {
	return {
		chooseTime: (song) => dispatch({type:'SYNC_SONG', song: song})
	}
}

module.exports = UploadSCItem
