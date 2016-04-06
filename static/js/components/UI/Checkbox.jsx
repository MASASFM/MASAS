var React = require("react")
var ReactDOM = require("react-dom")

var Checkbox = React.createClass({
	propTypes: {
		caps: React.PropTypes.bool,				// should button text be in all caps
		white: React.PropTypes.bool,				// should button text be in all caps
		style: React.PropTypes.object
	},

	componentWillMount: function() {
	},

	render: function() {
		
		return (
			<div className="MASAS-checkbox">
				<input type="checkbox" className="input" id={this.props.id}/><label className="label" htmlFor={this.props.id}>{this.props.children}</label>
			</div>
		)
	}
})

module.exports = Checkbox