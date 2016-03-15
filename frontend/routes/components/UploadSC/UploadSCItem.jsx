var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")

// var UploadSC = (props) => {

// }

var UploadSCItem = React.createClass({
	propTypes: {
		synced: React.PropTypes.bool	,		// is song synced
		track: React.PropTypes.object,		// song info
	},

	componentWillMount: function() {
	},

	showSyncScreen: function() {
		this.props.chooseTime(this.props.track)
	},

	render: function() {
		const millisToMinutesAndSeconds = function(millis) {
			var minutes = Math.floor(millis / 60000)
			var seconds = ((millis % 60000) / 1000).toFixed(0)
			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds // millisToMinutesAndSeconds(298999) =>  "4:59"
		}

		return (
			<div className={"upload-sc-item--wrapper" + (this.props.synced ? " synced" : "")}>
				<div className="artwork--wrapper">
					{ this.props.track.artwork_url ? <img src={this.props.track.artwork_url} alt="artwork" /> : ""}
				</div>
				<div className="song-info--wrapper">
					<div className="song-name">
						{this.props.track.title}
					</div>
					<div className="song-stats">
						<span className="number-listens">
							<img src="/static/img/MASAS_logo_tunes.svg" alt="music-not-icon" />
							1796
						</span>
						<span>{ millisToMinutesAndSeconds(this.props.track.duration) }</span>
					</div>
				</div>
				<div className="sync--wrapper">
					{ this.props.synced ?
						"synced"
						:
						<img src="/static/img/MASAS_sync_off.svg" alt="sync" onClick={this.showSyncScreen} />
					}
				</div>
			</div>
		)
	}
});

module.exports = UploadSCItem