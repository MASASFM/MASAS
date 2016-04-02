var React = require("react")
var ReactDOM = require("react-dom")
var jPlayer = require("jplayer")

var {getCookie} = require("../../../MASAS_functions.jsx")
var { Marquee } = require("../../containers/UI/UI.jsx")

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

		// add event listener to play new song at end of current song
		$("#jquery_jplayer_1").bind($.jPlayer.event.ended, (event) => {
			console.log('NEXT SONG')
			this.playRandomSong()
		})

		// update player UI on start play
		$("#jquery_jplayer_1").bind($.jPlayer.event.play, (event) => {
			console.log('PLAY SONG')
			this.props.dispatch({ type: 'PLAY' })
		})

		// update player UI on start play
		$("#jquery_jplayer_1").bind($.jPlayer.event.pause, (event) => {
			console.log('PAUSE SONG')
			this.props.dispatch({ type: 'PAUSE' })
		})
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

	playRandomSong: function() {
		var header = "Bearer " + this.props.MASASuser
		var csrftoken = getCookie('csrftoken')
		$.ajax({
			type: 'POST',
			url: '/api/play/',
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			},
			data: {
				
			},
			success: (data) => {
				console.log(data)
				this.props.playRandomSong(data.url)
			},
			error: (err) => {
				console.log(err)
			},
		})
	},

	getControlButtons() {
		// show loader if fetching song info
		if(this.props.isFetchingSong)
			return <img src="/static/img/puff_loader.svg" alt="loading" className="player-button" />

		// pause on click if song playing is not paused
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			return <img onClick={this.props.pause} src="/static/img/MASAS_player_pause.svg" alt="pause button" className="player-button" />

		// if nothing is playing, play random song on play icon
		if(!this.props.songPlaying)
			return <img onClick={this.playRandomSong} src="/static/img/MASAS_player_play.svg" alt="play button" className="player-button" />

		// else, click play to unpause
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

	renderRadioTime: function() {
		console.log("%%%%%%%", this.props.MASAS_songInfo)
		var switchVar = this.props.MASAS_songInfo.timeInterval.substr(this.props.MASAS_songInfo.timeInterval.length - 2, 1)
		console.log("^^^^^^^^^", switchVar)
		switch(switchVar) {
			case "1":
				return "#EarlyMorning"
			case "2":
				return "#LateMorning"
			case "3":
				return "#EarlyAfternoon"
			case "4":
				return "#LateAfternoon"
			case "5":
				return "#EarlyEvening"
			case "6":
				return "#LateEvening"
			default:
				return 
		}
	},

	render: function() {
		// store discover number for previous icon
		let discoverNumber = 0
		if(this.props.MASAS_songInfo)
			 discoverNumber = parseInt(this.props.MASAS_songInfo.timeInterval.substr(this.props.MASAS_songInfo.timeInterval.length - 2, 1))
		console.log('HISTORY LENGTH =>, ', this.props.discoverHistory.all.length)
		return (
			<div className="navbar-player--wrapper">
				{ 
					this.renderLikeIcon()
				}
				<div className="song-info--wrapper">
					{ this.props.SC_songInfo ? 
						<div>
							<div className="radio-info">
								<Marquee>
									Playing from <span className="time">{ this.renderRadioTime() }</span>
								</Marquee>
							</div>
							<div className="song-name">
								<Marquee className="song-title">
									{ this.props.SC_songInfo.title+ " - " }
								</Marquee>
								<Marquee className="song-artist">
									{ this.props.SC_songInfo.user.username }
								</Marquee>
							</div> 
						</div>
					: "" }
				</div>
				<div className="player-controls--wrapper">
					<img 
						src="/static/img/MASAS_next.svg" 
						onClick={ this.props.playPreviousSong.bind(this, this.props.discoverHistory) } 
						alt="next song" 
						className="previous-song-icon" 
						style={{ visibility: this.props.discoverHistory.all.length > 1 ? 'visible' : 'hidden' }}
						/>

					{ this.getControlButtons() }
				</div>
			</div>
		)
	}
})

module.exports = Player