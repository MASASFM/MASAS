var ReactRedux = require("react-redux")
var LikesItem = require('../../components/Likes/LikesItem.jsx')

var { pausePlayer } = require("../../../MASAS_functions.jsx")


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		playNewSong: (songToPlay) => dispatch({type:'PLAY_NEW_SONG', song: songToPlay}),
		pause: () => pausePlayer(dispatch),
	}
}

var LikesItem = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(LikesItem)
module.exports = LikesItem
