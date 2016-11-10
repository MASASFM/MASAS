// NOTE !!
// this component behaves differently on mobile and desktop

var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/MiniProfileWrapper.jsx")

var { browserHistory } = require('react-router')

var { getUserPkFromURL } = require("../../MASAS_functions.jsx")
var MiniProfile = require("./MiniProfile.jsx")

// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")

var MiniProfileWrapper = React.createClass({
	propTypes: {
		miniProfile: React.PropTypes.object,
		isModalOpened: React.PropTypes.bool,

		updateMiniProfileVisibility: React.PropTypes.func,
		updateMiniProfileContent: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		updateProfileBackArrowFunc: React.PropTypes.func,
	},

	componentDidMount: function() {
		window.addEventListener("resize", () => {
			if(this.props.miniProfile.isVisible && window.innerWidth < 993)
				this.redirectToProfile()
		})
	},

	componentWillUnmount: function() {
		window.removeEventListener("resize")
	},

	componentWillReceiveProps: function(nextProps) {
		if(
			this.props.miniProfile.isVisible !== nextProps.miniProfile.isVisible
			&& nextProps.miniProfile.isVisible === true
			&& window.innerWidth < 993
		) {	
			this.redirectToProfile()
		}
	},

	redirectToProfile: function() {
		// push client to user page
		browserHistory.push('/user/' + getUserPkFromURL(this.props.miniProfile.userData.url))

		// hide mini profile
		this.props.updateMiniProfileVisibility(false)

		// update back arrow function on Profile page so user can come back
		this.props.updateProfileBackArrowFunc( () => { browserHistory.goBack() } )
	},

	render: function() {
		return (
			<div 
				className={ 
					"main-mini-profile--wrapper" 
					+
					(!this.props.miniProfile.isVisible || this.props.isModalOpened ? " hidden" : "")
				}>
				<div className="main-mini-profile--wrapper2">
					<img 
						src="/static/img/MASAS_close_icon.svg"
						className="close-mini-profile-icon"
						alt="close profile"
						onClick={ () => this.props.updateMiniProfileVisibility(false) } />

					<MiniProfile userData={ this.props.miniProfile.userData } />
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(MiniProfileWrapper)