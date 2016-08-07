var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/UnsplashControls.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var UnsplashControls = React.createClass({
	propTypes: {
		unsplashArtistName: React.PropTypes.string,
		unsplashArtistUsername: React.PropTypes.string,
		backgroundURL: React.PropTypes.string,
		updateUnsplashArtist: React.PropTypes.func,
		updateBackgroundURL: React.PropTypes.func,
	},

	componentWillMount: function() {
		
	},

	updateUnsplashArtist: function() {
		var unsplashClientID = "8ad2087b753cfaaa3c601d73395a8205b727571b7491dc80b68ff4bde538ee6b"

		$.ajax({
			type: "GET",
			url: "https://api.unsplash.com/photos/random/?client_id=" + unsplashClientID,
			success: (r) => {
				console.log(r)
				this.props.updateUnsplashArtist(r.user.name, r.user.username, r.urls.regular)	
			},
			error: (e) => {
				console.log(e)
			}
		})
	},

	getNewBackground: function() {
		var unsplashClientID = "8ad2087b753cfaaa3c601d73395a8205b727571b7491dc80b68ff4bde538ee6b"

		$.ajax({
			type: "GET",
			url: "https://api.unsplash.com/photos/random/?username=" + this.props.unsplashArtistUsername + "&client_id=" + unsplashClientID,
			success: (r) => {
				console.log(r)
				this.props.updateBackgroundURL(r.urls.regular)
			},
			error: (e) => {
				console.log(e)
			}
		})
	},

	componentDidUpdate: function(prevProps, prevState) {
		document.getElementById("app-bg-image").style.backgroundImage = "url(" + this.props.backgroundURL + ")"	
	},

	render: function() {
		return (
			<div className="unsplash-controls">
				<div className="artist-controls">
					<a href={ "https://unsplash.com/" + this.props.unsplashArtistUsername } target="_blank">{ this.props.unsplashArtistName }</a>
					<a onClick={ this.updateUnsplashArtist }>
						<img src="/static/img/MASAS_icon_dot.svg" alt="random-artist"/>
					</a>
				</div>
				<div className="background-controls">
					<a onClick={ this.getNewBackground }>
						<img src="/static/img/MASAS_icon_dot.svg" alt="random-background"/>
					</a>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(UnsplashControls)
