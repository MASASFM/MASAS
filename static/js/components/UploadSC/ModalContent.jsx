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
						src="/static/img/MASAS_icon_lock.svg" 
						className="lock-icon"
						alt="lock icon"/>
				</div>
				<div className="checkbox--wrapper">
					<p>
					I certify that:
						<ul className="bullets" type="disc">
							<li>I have the explicit permission from all right-holders of this sound to aggree to the terms of uses</li>
							<li>this track is not a spam or commercial</li>
							<li>no royalties will be paid to any of the right-holders of this sound</li>
						</ul>
					</p>
					<div className="submit--wrapper">
						<Button 
							isBigButton={ true }
							isSecondaryAction={ true }
							wrapperStyle={{ marginRight: '1rem' }}
							onClick={ this.props.toogleIsModalOpened }
							className="submit">
							Cancel
						</Button>
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