var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
var { Marquee } = require("../../containers/UI/UI.jsx")

var ArtworkLine = React.createClass({
	propTypes: {
		discoverNumber: React.PropTypes.number.isRequired,			// artwork shown from discover
	},
 // = (props) => {
 	render: function() {
		let history = this.props.history.all.filter( ({MASAS_songInfo}) => {
			return parseInt(MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1)) === this.props.discoverNumber
		})

		if(history.length === 0)
			return (
				<div className="play-discover--wrapper">
					<h1 >Click here to play from discover</h1>
				</div>
				)
		else {
			// artwork line (song history)
			let artworkLine =  history.map( ({ SC_songInfo }) => {

				let artworkURL = ""
				if(SC_songInfo.artwork_url !== null) {
				 	artworkURL = SC_songInfo.artwork_url.substring(0,SC_songInfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
				 }
				return (
					<div className="artwork--wrapper" key={SC_songInfo.id}>
						<img src={ artworkURL } alt="artwork" className="artwork"/>
						<div className="song-info--wrapper">
							<Marquee className="title">{ SC_songInfo.title }</Marquee>
							<Marquee className="artist">{ SC_songInfo.user.username }</Marquee>
						</div>
					</div>
					)
			})
			artworkLine.pop()

			// bigger artwork in center
			let artworkPlaying = history.map( ({ SC_songInfo, MASAS_songInfo }) => { return { SC_songInfo, MASAS_songInfo } }).pop()
			console.log("======>",artworkPlaying)
			const MASAS_songPlayingInfo = artworkPlaying.MASAS_songInfo
			artworkPlaying = artworkPlaying.SC_songInfo 		// retro compa, needs refactor
			console.log("======>",artworkPlaying)
			// get bigger artwork
			let artworkPlayingURL = ""
			 if(typeof(artworkPlaying) !== "undefined") {
			 	artworkPlayingURL = artworkPlaying.artwork_url.substring(0,artworkPlaying.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
			 }
			return  (
				<div className="artwork-line--wrapper">
					<div className="left-side">
						<div className="artwork-line">
							{ artworkLine }
							<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
						</div>
					</div>
					<div className="artwork-playing--wrapper">	
						<div className="artwork-playing">	
							<img src={ artworkPlayingURL } className="artwork" alt="song playing" />
							<div className="player-button">
								{
									this.props.songPlaying === MASAS_songPlayingInfo.url && this.props.isPlayerPaused === false ?
										<img src="/static/img/MASAS_player_pause.svg" alt="pause" />
									:
										<img src="/static/img/MASAS_player_play.svg" alt="play" />
								}
							</div>
						</div>
						<div className="song-info--wrapper">
							<div 
								className="like-icon" 
								style={{ display: (this.props.songPlaying === MASAS_songPlayingInfo.url ? 'flex' : 'none') }}
								onClick={ this.props.toggleSongLike.bind(this, this.props.userToken, this.props.songPlaying) }>
								{
									this.props.isSongPlayingLiked ?
										<img src="/static/img/MASAS_liked.svg" alt="like" />
									:
										<img src="/static/img/MASAS_like_shadow.svg" alt="like" />
								}
							</div>
							<div className="song-info">
								<div className="title"><Marquee>{ artworkPlaying.title }</Marquee></div>
								<div className="artist"><Marquee>{ artworkPlaying.user.username }</Marquee></div>
							</div>
						</div>
					</div>
					<img className="next-button" src="/static/img/MASAS_next.svg" alt="next" />
					<div className="right-side">
					</div>
				</div>
				)
		}
	}
})

module.exports = ArtworkLine