var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ModalContent.jsx")

var { Link, Checkbox, Button } = require("../UI/UI.jsx")


var ModalContent = React.createClass({
	propTypes: {
		onSubmit: React.PropTypes.func.isRequired,				// function to execute when submitting form
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className="confirm-ownership--wrapper">
				<div className="lock-icon--wrapper">
					<img 
						src="/static/img/MASAS_icon_i_certify.svg" 
						className="lock-icon"
						alt="i certify icon"/>
				</div>
				<div className="checkbox--wrapper">
					<p className="paragraph">
					Before you get Discovered on MASAS, you have to certify that:
					</p>
					<ul className="bullets" type="disc">
						<li>You have the explicit permission from all right-holders of this sound to agree to the Terms of Use.</li>
						<li>This track is NOT a “Spam” or “Commercial”.</li>
						<li>No royalties will be paid to any of the right-holders of this sound for this upload.</li>
					</ul>
					<div className="submit--wrapper">
						<Button 
							isBigButton={ true }
							isSecondaryAction={ false }
							onClick={this.props.onSubmit}
							className="submit">
							Upload
						</Button>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ModalContent)