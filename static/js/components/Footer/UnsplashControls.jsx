var React = require("react")

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
		modalType: React.PropTypes.number,
		isModalOpened: React.PropTypes.bool,

		updateUnsplashArtist: React.PropTypes.func,
		updateBackgroundURL: React.PropTypes.func,
	},

	componentDidUpdate: function() {
		if(document.getElementById("app-bg-image"))
			document.getElementById("app-bg-image").style.backgroundImage = "url(" + this.props.backgroundURL + ")"	
	},

	render: function() {
		return (
			<div className={ "unsplash-controls " + (this.props.modalType === 2 && this.props.isModalOpened ? "hidden" : "") }>
				<div className="artist-controls">
					<a onClick={ this.props.updateUnsplashArtist }>
						<img src="/static/img/MASAS_icon_change_photograph.svg" alt="random-artist"/>
					</a>
					<a href={ "https://unsplash.com/" + this.props.unsplashArtistName } target="_blank">{ this.props.unsplashArtistName }</a>
				</div>
				<div className="background-controls">
					<a onClick={ this.props.updateBackgroundURL }>
						<img src="/static/img/MASAS_icon_change_unsplash_user.svg" alt="random-background"/>
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
