var React = require("react")
var ReactDOM = require("react-dom")

var Checkbox = React.createClass({
	propTypes: {
		style: React.PropTypes.object,
		className: React.PropTypes.string,
		initChecked: React.PropTypes.bool, 				// is it checked on mounting
		onChange: React.PropTypes.func.isRequired,			// function called on onchange callback
	},

	getInitialState: function() {
		return {
			isChecked: false,					// (BOOL) is checkbox checked
		}
	},

	componentWillMount: function() {
	},

	handleOnChange: function(e) {
		this.setState({ isChecked: !this.state.isChecked })
		this.props.onChange(!this.state.isChecked)
	},

	render: function() {
		console.log(this.state)
		return (
			<div className={ "MASAS-checkbox " + (this.props.className ? this.props.className : "")}>
				<input 
					type="checkbox" 
					checked={ this.state.isChecked }
					onChange={ this.handleOnChange }
					className="input" 
					id={this.props.id}/>
				<label className="label" htmlFor={this.props.id}>{this.props.children}</label>
			</div>
		)
	}
})

module.exports = Checkbox