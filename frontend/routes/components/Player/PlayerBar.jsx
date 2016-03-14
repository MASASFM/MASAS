var React = require("react")
var ReactDOM = require("react-dom")
var jPlayer = require("jplayer")

var {getCookie} = require("../../../MASAS_functions.jsx")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
// var { Link } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

var Player = React.createClass({
	propTypes: {
	},

	getInitialState: function() {
		return {
			songInPlayer: null,					// song currently playing (if any)
		};
	},

	componentWillMount: function() {
	},

	componentDidMount: function() {
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			this.props.resumePlaying()
	},

	componentWillReceiveProps: function(newProps) {
		if( this.props.songPlaying !== newProps.songPlaying || this.props.isPaused !== newProps.isPaused) 
		{
			if(newProps.songPlaying !== this.props.songPlaying) {
				// if new song, fetch new song and play it
				this.props.playNewSong(newProps)

			} else if(newProps.isPaused === true) {	
				// if not a new song and is paused, then pause
				this.props.pause()
			} else
				this.props.resumePlaying(this.props.playerAtTime)
		}
	},

	getControlButtons() {
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			return <img onClick={this.props.pause} src="/static/img/MASAS_player_pause.svg" alt="pause button" className="player-button" />
		else
			return <img onClick={this.props.play} src="/static/img/MASAS_player_play.svg" alt="play button" className="player-button" />
	},

	renderLikeIcon: function() {
		// var isSongLiked = !!this.props.isSongPlayingLiked.likedBy.filter((user) => {
		// 			return user.url === "http://localhost:8000/api/users/" + this.props.userPk + "/"
		// 		})

		if(this.props.isSongPlayingLiked)
			return <img src="/static/img/MASAS_liked.svg" alt="like icon" className="like-icon" onClick={this.props.toggleSongLike.bind(this, this.props.MASASuser, this.props.songPlaying)}/>
		else
			return <img src="/static/img/MASAS_like_shadow.svg" alt="like icon" className="like-icon" onClick={this.props.toggleSongLike.bind(this, this.props.MASASuser, this.props.songPlaying)} />
	},

	playRandomSong: function () {
		var csrftoken = getCookie('csrftoken')
		var header = "Bearer " + this.props.MASASuser

		$.ajax({
			type: "POST",
			url: '/api/play/',	
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			},
			data: {},
			success: (data) => {
				console.log(data)
				this.props.playRandomSong(data.url)
				// this.props.closeWindow()
			},
			error: (err) => {
				console.log(err)
			},
		})
	},

	render: function() {
		// this.loadPlayer()

		return (
			<div className="navbar-player--wrapper">
				{ 
					this.renderLikeIcon()
				}
				<div className="song-info--wrapper" onClick={this.playRandomSong}>
					<span className="song-artist">
						{ this.props.SC_songInfo ? this.props.SC_songInfo.user.username : "" }
					</span>
					<span>
						PLAY RANDOM SONG
					</span>
					<span className="song-title">
						{ this.props.SC_songInfo ? this.props.SC_songInfo.title : "" }
					</span>
				</div>
				<div className="player-controls--wrapper">
					{ this.getControlButtons() }
				</div>
			</div>
		)
	}
});

module.exports = Player