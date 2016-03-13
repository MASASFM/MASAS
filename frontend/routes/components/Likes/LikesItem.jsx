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

	render: function() {
		var SCinfo = this.props.SCinfo
		// if (SCinfo.title.length > 13)
					// SCinfo.title = SCinfo.title.substr(0,15) + "..."

		var artworkURL = SCinfo.artwork_url
		 if(SCinfo.artwork_url !== null) {
		 	console.log("hi")
		 	console.log(SCinfo.artwork_url)
		 	console.log(typeof(SCinfo.artwork_url))
		 	artworkURL = SCinfo.artwork_url.substring(0,SCinfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
		 	console.log(artworkURL)
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
})

module.exports = LikesItem