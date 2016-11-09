var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/LikesItem.jsx")

var { timeIntervalURLToString } = require("../../MASAS_functions.jsx")

var { Marquee } = require("../UI/UI.jsx")

var LikesItem = React.createClass({
	propTypes: {
		MASASinfo: React.PropTypes.object,			// song info from MASAS database
		SCinfo: React.PropTypes.object,			// related song info from SC
		playNewSongFromPlaylist: React.PropTypes.func,
		loadPlaylist: React.PropTypes.func,
		pause: React.PropTypes.func,
		isPaused: React.PropTypes.bool,
		isFetchingSong: React.PropTypes.bool,
		userData: React.PropTypes.object,
		songPlaying: React.PropTypes.string,
		isShowingArtistInfo: React.PropTypes.bool,
		MASAS_songPk: React.PropTypes.number,
	},

	playTrack: function() {
		var playlist = [].concat(this.props.userData.likes)
		playlist.sort((a,b) => { return Date.parse(a.created) < Date.parse(b.created) })
		playlist = playlist.map((like) => {
			return like.song.url
		})

		var playlistPosition = 0
		for(var i = 0; i < playlist.length; i++) {
			if(this.props.MASASinfo.url === playlist[i])
				playlistPosition = i
		}

		this.props.loadPlaylist(playlist)
		this.props.playNewSongFromPlaylist(playlistPosition)
	},

	renderPlayerControlButton: function() {
		if(this.props.MASASinfo)	// prevent accessing MASAS_songInfo.url before props.MASAS_songInfo is loaded
		{
			if(this.props.isFetchingSong)
				return <img src="/static/img/puff_loader.svg" alt="loading" className="artwork" />
			
			if (this.props.MASASinfo.url === this.props.songPlaying && this.props.isPaused === false)
				return <img src="/static/img/MASAS_player_pause.svg" alt="pause" className="artwork" onClick={this.props.pause }/>

			return <img src="/static/img/MASAS_player_play.svg" alt="play" className="artwork" onClick={this.playTrack }/>
		}
	},

	render: function() {
		var SCinfo = this.props.SCinfo

		var artworkURL = SCinfo.artwork_url
		if(SCinfo.artwork_url !== null) {
			artworkURL = SCinfo.artwork_url.substring(0,SCinfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
		}

		const isShowingArtistInfo = this.props.isShowingArtistInfo

		return (
			<div className="likes-item--wrapper">
				
				<div className="artwork--wrapper">
					<div className="artwork-div" style={ !this.props.SCinfo.artwork_url ? {backgroundColor: 'black'} : {} }>
						{ this.props.SCinfo.artwork_url ? <img src={ artworkURL } alt="artwork" className="artwork" onClick={this.playTrack } /> : "" }
					</div>
					<div className="artwork-overlay">
						{ this.renderPlayerControlButton() }
					</div>
				</div>
				<div className="text--wrapper" onClick={ () => { } }>
					<div className="song-name--wrapper">
						<div className="title">
							<Marquee>{ SCinfo.title }</Marquee>
						</div>
						<div className="dash"> - </div>
						<div className="artist">
							<Marquee>{ SCinfo.user.username }</Marquee>
						</div>
					</div>
					<div className="song-stats--wrapper">
						<div className="time">
							{ timeIntervalURLToString(this.props.MASASinfo.timeInterval) }
						</div>
						<div className="plays">
							{ this.props.MASASinfo.play_count } <img src="/static/img/MASAS_icon_play_count.svg" alt="play count" className="play-count-icon" />
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(LikesItem)
