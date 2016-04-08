var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ModalContent.jsx")

var { Link, Checkbox, Button } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var ModalContent = React.createClass({
	propTypes: {
		onSubmit: React.PropTypes.func.isRequired,				// function to execute when submitting form
	},

	componentWillMount: function() {
	},

	render: function() {
		console.log((this.props.checkbox1_checked && this.props.checkbox2_checked && this.props.checkbox3_checked))
		return (
			<div className="confirm-ownership--wrapper">
				<div className="lock-icon--wrapper">
					{ 
						(this.props.checkbox1_checked && this.props.checkbox2_checked && this.props.checkbox3_checked) ? 
							<img 
								src="/static/img/MASAS_icon_unlock.svg" 
								className="lock-icon"
								alt="lock icon"/>
						: 
							<img 
								src="/static/img/MASAS_icon_lock.svg" 
								className="lock-icon"
								alt="lock icon"/>

					}
				</div>
				<div className="checkbox--wrapper">
					<Checkbox 
						initChecked={ this.props.checkbox1_checked }
						className="checkbox-row" 
						onChange={ this.props.toogleCheckbox1 }>
						I certify that I have the explicit permission from all right-holders of this sound to aggree to the <Link to="/">terms of uses</Link>
					</Checkbox>
					<Checkbox 
						initChecked={ this.props.checkbox2_checked }
						className="checkbox-row" 
						onChange={ this.props.toogleCheckbox2 }>
						I certify that this track is not a spam or commercial
					</Checkbox>
					<Checkbox 
						initChecked={ this.props.checkbox3_checked }
						className="checkbox-row" 
						onChange={ this.props.toogleCheckbox3 }>
						I certify that no royalties will be paid to any of the right-holders of this sound
					</Checkbox>
					<div className="submit--wrapper">
						<Button 
							isDisabled={ (this.props.checkbox1_checked && this.props.checkbox2_checked && this.props.checkbox3_checked) ? false : true }
							isBigButton={ true }
							isSecondaryAction={ (this.props.checkbox1_checked && this.props.checkbox2_checked && this.props.checkbox3_checked) ? false : true }
							onClick={this.props.onSubmit}
							className="submit">
							Upload my sound on MASAS
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