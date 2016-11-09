var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/MiniProfileWrapper.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var MiniProfileWrapper = React.createClass({
	propTypes: {
		miniProfile: React.PropTypes.object,
		isModalOpened: React.PropTypes.bool,

		updateMiniProfileVisibility: React.PropTypes.func,
		updateMiniProfileContent: React.PropTypes.func,
		updateTitle: React.PropTypes.func
	},

	componentWillReceiveProps: function(newProps) {

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

					{ this.props.miniProfile.userData.name }
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(MiniProfileWrapper)