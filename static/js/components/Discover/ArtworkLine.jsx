var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ArtworkLine.jsx")

var { Marquee } = require("../UI/UI.jsx")

var ArtworkLine = React.createClass({
	propTypes: {
		discoverNumber: React.PropTypes.number.isRequired,			// artwork shown from discover
		isFooterOpened: React.PropTypes.bool,
		toggleIsFooterOpened: React.PropTypes.func,
	},

	componentDidMount: function() {
		this.scrollToEnd()
	},

	componentDidUpdate: function() {
		this.scrollToEnd()
	},

	scrollToEnd: function() {
		// this.refs.artworkLine.animate({ scrollLeft: this.refs.artworkLine.scrollWidth }, 1000);
		this.refs.artworkLine.scrollLeft = this.refs.artworkLine.scrollWidth
	},
 
 	render: function() {

		let history = this.props.history.all.filter( ({MASAS_songInfo}) => {
			return parseInt(MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1)) === this.props.discoverNumber
		})

		// if nothing is playing
		if(history.length === 0)
			return (
				
				<div className="artwork-line--wrapper">
					<div className="left-side">
						<div className="artwork-line" ref="artworkLine">
							<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
						</div>
					</div>
					<div className="artwork-playing--wrapper">	
						<div className="artwork-playing">	
							<div 
								onClick={ this.props.playRandomSong.bind(this, this.props.MASASuser, this.props.discoverNumber)}
								className="player-button"
								style={{ display: 'flex' }}>
								<img src="/static/img/MASAS_player_play.svg" alt="play"/>
							</div>
						</div>
						<div className="song-info--wrapper">
							<div className="like-icon">
								<img src="/static/img/MASAS_like_shadow.svg" style={{ pointer: 'default' }} alt="like" />
							</div>
							<div className="song-info">
								<div className="title"></div>
								<div className="artist"></div>
							</div>
						</div>
					</div>
					<div className="right-side">
					</div>
				</div>
				)
		else {
			// artwork line (song history)
			let key_ID = 0
			let artworkLine =  history.map( ({ SC_songInfo, MASAS_songInfo }) => {
				key_ID = key_ID + 1
				let artworkURL = ""
				if(SC_songInfo.artwork_url !== null) {
				 	artworkURL = SC_songInfo.artwork_url.substring(0,SC_songInfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
				 }
				return (
					<div className="artwork--wrapper" key={ key_ID }>
						<div className="artwork--wrapper2">
							{ artworkURL ?
									<img src={ artworkURL } alt="artwork" className="artwork"/>
								:
									<div className="artwork"></div>
							}
							<div 
								className={ "player-button" }
								onClick={ 
									this.props.songPlaying === MASAS_songInfo.url && this.props.isPlayerPaused === false ?
										this.props.pause
									:
										this.props.playAndSaveHistory.bind(this, MASAS_songInfo.url)
									}>
								{
									this.props.songPlaying === MASAS_songInfo.url && this.props.isPlayerPaused === false ?
										<img 
											src="/static/img/MASAS_player_pause.svg" 
											alt="pause" />
									:
										<img 
											src="/static/img/MASAS_player_play.svg" 
											
											alt="play" />
								}
							</div>
						</div>

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

			const MASAS_songPlayingInfo = artworkPlaying.MASAS_songInfo
			artworkPlaying = artworkPlaying.SC_songInfo 		// retro compa, needs refactor
			// get bigger artwork
			let artworkPlayingURL = ""
			 if(typeof(artworkPlaying) !== "undefined") 
			 	if(artworkPlaying.artwork_url)
				 	artworkPlayingURL = artworkPlaying.artwork_url.substring(0,artworkPlaying.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
			 
			return  (
				<div className="artwork-line--wrapper">
					<div className="left-side">
						<div className="artwork-line" ref="artworkLine">
							<div className="artwork-line2">
								{ artworkLine }
							</div>
							<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
						</div>
					</div>
					<div className="artwork-playing--wrapper">	
						<div className="artwork-playing">	
							{ artworkPlayingURL ?
									<img src={ artworkPlayingURL } className="artwork" alt="song playing" />
								:
									""
							}
							<div 
								className={ "player-button" + (this.props.songPlaying !== MASAS_songPlayingInfo.url  ? " show-play-button" : "") }
								onClick={ 
									this.props.songPlaying === MASAS_songPlayingInfo.url && this.props.isPlayerPaused === false ?
										this.props.pause
									:
										this.props.play.bind(this, MASAS_songPlayingInfo.url)
									}>
								{
									this.props.songPlaying === MASAS_songPlayingInfo.url && this.props.isPlayerPaused === false ?
										<img 
											src="/static/img/MASAS_player_pause.svg" 
											alt="pause" />
									:
										<img 
											src="/static/img/MASAS_player_play.svg" 
											
											alt="play" />
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
					<div className={ "button " + (this.props.songPlaying === MASAS_songPlayingInfo.url ? 'show' : '') }>
						<img
							onClick={ this.props.playRandomSong.bind(this, this.props.MASASuser, this.props.discoverNumber)} 
							className="next-song"
							src="/static/img/MASAS_next.svg"
							 alt="next" />
						{ 
							this.props.isFooterOpened === false ?
								<img
									onClick={ this.props.toggleIsFooterOpened }
									src="/static/img/MASAS_icon_dot.svg"
									className="toggle-menu"
									alt="menu icon" />
							:
								<img
									onClick={ this.props.toggleIsFooterOpened }
									src="/static/img/MASAS_icon_close.svg"
									className="toggle-menu small"
									alt="menu icon" />
						}

					</div>
					<div className="right-side">
					</div>
				</div>
				)
		}
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtworkLine)
