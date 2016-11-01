var React = require("react")

// var ReactRedux = require("react-redux")
// var { mapStateToProps, mapDispatchToProps } = require("./containers/Template.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
var { Button } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var SCSyncInstructionModal = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className="SC-sync-instruction-modal--wrapper">
				<div className="intro-text">
					You need to enable "app playback" on this particular track
				</div>
				<div className="bullets">
						<div>
							<span className="number">1.</span>
							<span className="subtitle">Go to your "track" on your soundcloud profile</span>
						</div>
						<div>
							<span className="number">2.</span>
							<span className="subtitle">Locate the track and click the pencil icon (to the right of the share button)</span>
						</div>
						<div>
							<span className="number">3.</span>
							<span className="subtitle">Make your track public in the "Basic Info" tab and enable app playback on
							the "Permissions" tab</span>
						</div>
				</div>
				<div className="button--wrapper">
					<Button onClick={ () => {} } isSecondaryAction={ true }>Ok</Button>
				</div>
			</div>
		)
	}
})

module.exports = SCSyncInstructionModal