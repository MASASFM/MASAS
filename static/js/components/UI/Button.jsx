var React = require("react")
var ReactDOM = require("react-dom")

var Button = React.createClass({
	propTypes: {
		noBorders: React.PropTypes.bool,				// should button have borders
		className: React.PropTypes.string,				// class names
		isBigButton: React.PropTypes.bool, 			// is it a big button
		isSecondaryAction: React.PropTypes.bool,		// is it a secondary button
		onClick: React.PropTypes.func.isRequired,		// what to do when user clicks on button
		isDisabled: React.PropTypes.bool,			// is button disabled
		wrapperStyle: React.PropTypes.object,		// styles associated with button wrapper
	},

	componentWillMount: function() {
	},

	getDefaultProps: function() {
		return {
				noBorders: true,
				className: "",
				isDisabled: false,
				isSecondaryAction: false,
				isBigButton: true,
				isDisabled: false,
				wrapperStyle: {},
			}
	},

	render: function() {
		return (
			<div 
				className={"MASAS-button" + (this.props.isSecondaryAction ? " secondary-button " : "") + (" " + this.props.className + " ") + (this.props.isBigButton ? "MASAS-big-button " : "") +  (this.props.noBorders ? " no-borders " : "") + (this.props.isDisabled ? " disabled " : "")} 
				onClick={ !this.props.isDisabled ? this.props.onClick : ( () => {} ) }
				style={ this.props.wrapperStyle }>
				<div className={"wrapper"}>
					{this.props.children}
				</div>
			</div>
		)
	}
})

module.exports = Button