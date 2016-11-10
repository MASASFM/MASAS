var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/MiniProfile.jsx")

var ProfileTrackList = require("./ProfileTrackList.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var Template = (props) => {

// }

var MiniProfile = React.createClass({
	propTypes: {
		miniProfile: React.PropTypes.object,

		updateSCsongInfo: React.PropTypes.func,
	},

	componentDidMount: function() {
		this.props.updateSCsongInfo()
	},

	render: function() {
		return (
			<div>
				{ this.props.miniProfile.userData.username }

				{
					this.props.miniProfile.SC_songInfo.length > 0 ?
						<ProfileTrackList 
							songs={ this.props.miniProfile.userData.songs }
							isPublicProfile={ true }
							userData={ this.props.miniProfile.userData }
							userSCSongs={ this.props.miniProfile.SC_songInfo }/>
					:
						"No Songs"
				}
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(MiniProfile)