var ReactRedux = require("react-redux")
var TrackItem = require('../../components/Profile/TrackItem.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		playNewSong: (songToPlay) => dispatch({type:'PLAY_NEW_SONG', song: songToPlay})
	}
}

var TrackItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackItem)
module.exports = TrackItem;
