var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
// var { Link } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

var TrackItem = React.createClass({
	propTypes: {
		track: React.PropTypes.object,			//track SC info
		MASAS_songInfo: React.PropTypes.object,		//track MASAS info
	},

	componentWillMount: function() {
	},

	playTrack: function() {
		// console.log("======"+this.props.MASAS_songInfo.url+"======")
		this.props.playNewSong(this.props.MASAS_songInfo.url)
	},

	renderRadioTime: function() {
		var switchVar = this.props.MASAS_songInfo.timeInterval.substr(this.props.MASAS_songInfo.timeInterval.length - 2, 1);
		switch(switchVar) {
			case "1":
				return "12-3 AM"
			case "2":
				return "6-9 AM"
			case "3":
				return "9-12AM"
			case "4":
				return "1-4 PM"
			case "5":
				return "5-8 PM"
			case "6":
				return "9-12 PM"
			default:
				return 0
		}
	},

	renderPlayerControlButton: function() {
		if (this.props.MASAS_songInfo.url === this.props.songPlaying && this.props.isPaused === false)
			return <img src="/static/img/MASAS_player_pause.svg" alt="pause" className="artwork" onClick={this.props.pause }/>
		else
			return <img src="/static/img/MASAS_player_play.svg" alt="play" className="artwork" onClick={this.playTrack }/>
	},

	render: function() {
		return (
			<div className="track--wrapper">
				<div className="artwork--wrapper">
					<div className="artwork-div">
						<img src={this.props.track.artwork_url} alt="cover art" className="artwork" onClick={this.playTrack }/>
					</div>
					<div className="artwork-overlay">
						{ this.renderPlayerControlButton() }
					</div>
				</div>
				<div className="song-info--wrapper">
					<div className="song-stats-1">
						<div className="song-name">
							{this.props.track.title} <br /> 
							{this.props.track.user.username}
						</div>
						<div className="lives-left">
							<img src="/static/img/MASAS_logo_life.svg" alt="life-on" />
							<img src="/static/img/MASAS_logo_life.svg" alt="life-on" />
							<img src="/static/img/MASAS_logo_life_off.svg" alt="life-on" />

						</div>
					</div>
					<div className="song-stats-2">
						<div className="radio">
							<span className="title">Radio</span> { this.props.MASAS_songInfo.timeInterval.substr(this.props.MASAS_songInfo.timeInterval.length - 2, 1) }
						</div>
						<div className="time">
							<span className="title">Time</span> { this.renderRadioTime() }
						</div>
						<div className="plays">
							<span className="title">Plays</span> { this.props.MASAS_songInfo.play_count }
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = TrackItem