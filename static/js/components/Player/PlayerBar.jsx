var React = require("react")
var ReactDOM = require("react-dom")
var jPlayer = require("jplayer")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/PlayerBar.jsx")

var { getTimeIntervalFromURL } = require("../../MASAS_functions.jsx")
var { Marquee } = require("../UI/UI.jsx")

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

	componentWillUnmount: function() {
		$("#jquery_jplayer_1").unbind($.jPlayer.event.ended)
		$("#jquery_jplayer_1").unbind($.jPlayer.event.play)
		$("#jquery_jplayer_1").unbind($.jPlayer.event.waiting)
		$("#jquery_jplayer_1").unbind($.jPlayer.event.stalled)
		$("#jquery_jplayer_1").unbind($.jPlayer.event.canplay)
		$("#jquery_jplayer_1").unbind($.jPlayer.event.pause)
	},

	componentDidMount: function() {
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			this.props.resumePlaying()

		// add event listener to play new song at end of current song
		$("#jquery_jplayer_1").bind($.jPlayer.event.ended, (event) => {
			// get state from reducer because "this" object doesn't have access to state mutations 
			// (this object is a copy of component instance at componentDidMount)
			const { getState } = require('../../reducers/reducers.js')
			const currentTimeIntervalURL = getState().playerReducer.MASAS_songInfo.timeInterval
			const MASASuser = getState().appReducer.MASASuser

			const currentTimeInterval = getTimeIntervalFromURL(currentTimeIntervalURL)
			console.log('NEXT SONG')
			
			this.props.playRandomSong(MASASuser, currentTimeInterval)
		})

		// update player UI on start play
		$("#jquery_jplayer_1").bind($.jPlayer.event.play, (event) => {
			console.log('PLAY SONG')
			this.props.dispatch({ type: 'PLAY' })
			this.props.dispatch({ type: 'SET_IS_BUFFERING_FALSE' })
		})

		// test buffering
		$("#jquery_jplayer_1").bind($.jPlayer.event.waiting, (event) => {
			console.log('BUFFERING =>', event)
			this.props.dispatch({ type: 'SET_IS_BUFFERING_TRUE' })
		})
		$("#jquery_jplayer_1").bind($.jPlayer.event.stalled, (event) => {
			console.log('STALLED =>', event)
			this.props.dispatch({ type: 'SET_IS_BUFFERING_TRUE' })
		})
		$("#jquery_jplayer_1").bind($.jPlayer.event.canplay, (event) => {
			console.log('STOP BUFFERING =>', event)
			this.props.dispatch({ type: 'SET_IS_BUFFERING_FALSE' })
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
				this.props.playNewSong(newProps, this.props.addToHistory)

			} else if(newProps.isPaused === true) {	
				// if not a new song and is paused, then pause
				this.props.pause()
			} else
				this.props.resumePlaying(this.props.playerAtTime)
		}
	},

	// playRandomSong: function() {
	// 	var header = "Bearer " + this.props.MASASuser
	// 	var csrftoken = getCookie('csrftoken')
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: '/api/play/?time_interval_id=1',
	// 		headers: {
	// 			"Authorization": header,
	// 			"X-CSRFToken": csrftoken
	// 		},
	// 		data: {
				
	// 		},
	// 		success: (data) => {
	// 			console.log("/api/test !!! => ", data)
	// 			this.props.playRandomSong(data.url)
	// 		},
	// 		error: (err) => {
	// 			console.log(err)
	// 		},
	// 	})
	// },

	getControlButtons() {
		// show loader if fetching song info
		if(this.props.isFetchingSong)
			return <img src="/static/img/puff_loader.svg" alt="loading" className="player-button" />

		// pause on click if song playing is not paused
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			return <img onClick={this.props.pause} src="/static/img/MASAS_player_pause.svg" alt="pause button" className="player-button" />

		// if nothing is playing, play random song on play icon
		if(!this.props.songPlaying)
			return <img onClick={this.props.playRandomSong.bind(this, this.props.MASASuser, 0)} src="/static/img/MASAS_player_play.svg" alt="play button" className="player-button" />

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
		var switchVar = this.props.MASAS_songInfo.timeInterval.substr(this.props.MASAS_songInfo.timeInterval.length - 2, 1)
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
		return (
			<div className="navbar-player--wrapper">
				{ 
					this.renderLikeIcon()
				}
				<div className="song-info--wrapper1">
					{ this.props.SC_songInfo ? 
						<div className="song-info--wrapper2">
							<div className="text-info">
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
							<div className="sc-icon">
								<a href={ this.props.SC_songInfo.permalink_url } target="_blank">
									<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud page" />
								</a>
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

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Player)