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

	render: function() {
		return (
			<div className="track--wrapper">
				<img src={this.props.track.artwork_url} alt="cover art" className="artwork" onClick={this.playTrack }/>
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
							<span className="title">Radio</span> 1
						</div>
						<div className="time">
							<span className="title">Time</span> 6-9AM
						</div>
						<div className="plays">
							<span className="title">Plays</span> 210
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = TrackItem