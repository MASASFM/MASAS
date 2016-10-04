var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ArtworkLine.jsx")

var ArtworkLineItem = require("./ArtworkLineItem.jsx")

var ArtworkLine = React.createClass({
	propTypes: {
		discoverNumber: React.PropTypes.number.isRequired,			// artwork shown from discover
		isFooterOpened: React.PropTypes.bool,
		toggleIsFooterOpened: React.PropTypes.func,
		renderForUITip: React.PropTypes.bool,	
		isModalOpened: React.PropTypes.bool,
		modalType: React.PropTypes.number,
		history: React.PropTypes.object,
		playRandomSong: React.PropTypes.func,
		MASASuser: React.PropTypes.string,
		songPlaying: React.PropTypes.string,
		pause: React.PropTypes.func,
		play: React.PropTypes.func,
		isPlayerPaused: React.PropTypes.bool,
		toggleSongLike: React.PropTypes.func,
		playAndSaveHistory: React.PropTypes.func,
		isSongPlayingLiked: React.PropTypes.bool,
		userToken: React.PropTypes.string,
		songPlayingArtistInfo: React.PropTypes.object,
	},

	getDefaultProps: function() {
		return {
			renderForUITip: false,
		}
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
		let { renderForUITip, isModalOpened, modalType } = this.props

		let history = this.props.history.all.filter( ({MASAS_songInfo}) => {
			return parseInt(MASAS_songInfo.timeInterval.substr(MASAS_songInfo.timeInterval.length - 2, 1)) === this.props.discoverNumber
		})

		// if nothing is playing
		if(history.length === 0)
			return (
				
				<div className="artwork-line--wrapper">
					<div 
						className="left-side"
						style={{
							visibility: isModalOpened && modalType === 2 ? 'hidden' : 'visible'
						}}>
						<div className="artwork-line" ref="artworkLine">
							<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
						</div>
					</div>
					<div 
						className="artwork-playing--wrapper"
						style={{
							visibility: !renderForUITip && isModalOpened && modalType === 2 ? 'hidden' : 'visible'
						}}>	
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
			let artworkLine =  history.map( ({ SC_songInfo, MASAS_songInfo, artistInfo }) => {
				key_ID = key_ID + 1
				let artworkURL = ""
				if(SC_songInfo.artwork_url !== null) {
					artworkURL = SC_songInfo.artwork_url.substring(0,SC_songInfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
				}

				let isItemPlaying = this.props.songPlaying === MASAS_songInfo.url && this.props.isPlayerPaused === false

				return (
					<ArtworkLineItem 
						isModalOpened={ isModalOpened }
						modalType={ modalType }
						key_ID={ key_ID }
						artworkURL={ artworkURL }
						SC_songInfo={ SC_songInfo }
						MASAS_songInfo={ MASAS_songInfo }
						isItemPlaying={ isItemPlaying }
						pause={ this.props.pause }
						playAndSaveHistory={ this.props.playAndSaveHistory }
						artistInfo={ artistInfo }
						/>
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
					<div 
						className={ "artwork-playing--wrapper " + (renderForUITip && isModalOpened && modalType === 2 ? 'hide-on-mobile' : '') + (!renderForUITip && isModalOpened && modalType === 2 ? 'hide-content' : '') }>

						<ArtworkLineItem 
							isModalOpened={ isModalOpened }
							modalType={ modalType }
							key_ID={ 0 }
							artworkURL={ artworkPlayingURL }
							SC_songInfo={ artworkPlaying }
							MASAS_songInfo={ MASAS_songPlayingInfo }
							isItemPlaying={ this.props.songPlaying === MASAS_songPlayingInfo.url && this.props.isPlayerPaused === false }
							pause={ this.props.pause }
							playAndSaveHistory={ this.props.playAndSaveHistory }
							isArtworkLarge={ true }
							songPlaying={ this.props.songPlaying }
							toggleSongLike={ this.props.toggleSongLike }
							isSongPlayingLiked={ this.props.isSongPlayingLiked }
							userToken={ this.props.userToken }
							artistInfo={ this.props.songPlayingArtistInfo }
							/>
					</div>
					<div 
						className={ "button " + (this.props.songPlaying === MASAS_songPlayingInfo.url ? ' show ' : '') }
						style={{
							visibility: isModalOpened && modalType === 2 ? 'hidden' : 'visible'
						}}>
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
