var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ArtworkLineItem.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Marquee } = require("../UI/UI.jsx")


var ArtworkLineItem = React.createClass({
	propTypes: {
		isModalOpened: React.PropTypes.bool,
		modalType: React.PropTypes.number,

		key_ID: React.PropTypes.number,
		artworkURL: React.PropTypes.string,
		SC_songInfo: React.PropTypes.object,
		MASAS_songInfo: React.PropTypes.object,
		isItemPlaying: React.PropTypes.bool,
		pause: React.PropTypes.func,
		playAndSaveHistory: React.PropTypes.func,
		isArtworkLarge: React.PropTypes.bool,			// larger ArtworkLineItem
	},

	getDefaultProps: function() {
		return {
			isArtworkLarge: false,
		}
	},

	componentWillMount: function() {
	},

	render: function() {
		let { 
			isModalOpened, 
			modalType, 
			key_ID, 
			artworkURL, 
			MASAS_songInfo,
			isItemPlaying,
			SC_songInfo,
			isArtworkLarge
		} = this.props

		return (
			<div 
				className={ "artwork--wrapper " + (isArtworkLarge ? "artwork-playing" : "") }
				key={ key_ID }
				style={{
					visibility: isModalOpened && modalType === 2 ? 'hidden' : 'visible'
				}}>
				<div className="artwork--wrapper2">
					{ artworkURL ?
							<img src={ artworkURL } alt="artwork" className="artwork"/>
						:
							<div className="artwork"></div>
					}
					<div 
						className={ "player-button" }
						onClick={ 
							isItemPlaying ?
								this.props.pause
							:
								this.props.playAndSaveHistory.bind(this, MASAS_songInfo.url)
							}>
						{
							isItemPlaying ?
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
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtworkLineItem)