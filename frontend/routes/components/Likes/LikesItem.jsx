var React = require("react")
var ReactDOM = require("react-dom")

// var {goToURL} = require("../../../MASAS_functions.jsx")
// var {getCookie} = require("../../../MASAS_functions.jsx")
// var { Link } = require("../../containers/UI/UI.jsx")

// var Template = (props) => {

// }

var LikesItem = React.createClass({
	propTypes: {
		MASASinfo: React.PropTypes.object,			// song info from MASAS database
		SCinfo: React.PropTypes.object,			// related song info from SC
	},

	componentWillMount: function() {
		// this.props.updateTitle('Template', '0')		// 0 = menu icon; 1 = arrow back
	},

	playTrack: function() {
		this.props.playNewSong(this.props.MASASinfo.url)
	},

	renderRadioTime: function() {
		var switchVar = this.props.MASASinfo.timeInterval.substr(this.props.MASASinfo.timeInterval.length - 2, 1)
		
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

	render: function() {
		var SCinfo = this.props.SCinfo
		// if (SCinfo.title.length > 13)
		// SCinfo.title = SCinfo.title.substr(0,15) + "..."

		var artworkURL = SCinfo.artwork_url
		 if(SCinfo.artwork_url !== null) {
		 	artworkURL = SCinfo.artwork_url.substring(0,SCinfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
		 }

		return (
			<div className="likes-item--wrapper">
				<img src={ artworkURL } alt="artwork" className="artwork" onClick={this.playTrack } />
				<div className="text--wrapper">
					<div className="song-name--wrapper">
						<div className="title">
							{ SCinfo.title }
						</div>
						<div className="dash"> - </div>
						<div className="artist">
							{ SCinfo.user.username }
						</div>
					</div>
					<div className="song-stats--wrapper">
						<div className="radio">
							<span className="title">Radio</span> { this.props.MASASinfo.timeInterval.substr(this.props.MASASinfo.timeInterval.length - 2, 1) }
						</div>
						<div className="time">
							<span className="title">Time</span> { this.renderRadioTime() }
						</div>
						<div className="plays">
							<span className="title">Plays</span> 210
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = LikesItem