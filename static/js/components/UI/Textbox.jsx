 var React = require("react")
var ReactDOM = require("react-dom")
const { dispatch } = require("../../reducers/reducers.js")
//
var Textbox = React.createClass({
	propTypes: {
		label: React.PropTypes.string,				// textbox label
		labelError: React.PropTypes.string,			// textbox label when error
		error: React.PropTypes.bool,				// true = error
		actionString: React.PropTypes.string, 		// name of action to call on string update 
		actionParamName: React.PropTypes.string, 	// name of input attribute of action dispatched 
		id: React.PropTypes.string, 				// name used to display textbox and error UI properly
		onChange: React.PropTypes.func,			// callback called when input field changes
		value: React.PropTypes.string,				// value of input field
	},

	getDefaultProps: function() {
		return {
			onChange: () => {},
		}
	},

	getInitialState: function() {
		return {
			input: "", 
		}
	},

	componentWillMount: function() {
	},

	componentDidUpdate: function(prevProps, prevState) {
	},

	onInputChange: function(e) {
		this.props.onChange(e.target.value)
	},

	render: function() {
		return (
			<div className="MASAS-textbox">
				<div className={"MASAS-textbox--wrapper" + (this.props.error ? " error" : "")}>
					<input id={this.props.id} value={ this.props.value } onChange={ this.onInputChange } className="MASAS-text-input" type="text" />
					<label className="MASAS-label" htmlFor={this.props.id}>
						{ this.props.error ?
							this.props.labelError 
							:
							this.props.children 
						}
					</label>
				</div>
			</div>
		)
	}
})

module.exports = Textbox
