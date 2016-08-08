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
	},

	getInitialState: function() {
		return {
			input: "", 
		}
	},

	componentWillMount: function() {
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(typeof(this.props.actionString) !== "undefined") {
			var dispatchObject = { type: this.props.actionString }
			dispatchObject[this.props.actionParamName] = this.state.input
			dispatch(dispatchObject) 
		}
	},

	onInputChange: function(e) {
		this.setState({ input: e.target.value })
	},

	render: function() {
		return (
			<div className="MASAS-textbox">
				<div className={"wrapper" + (this.props.error ? " error" : "")}>
					<label className="MASAS-label" htmlFor={this.props.id}>
						{ this.props.error ?
							this.props.labelError 
							:
							this.props.children 
						}
					</label>
					<input id={this.props.id} value={ this.state.input } onChange={ this.onInputChange } className="MASAS-text-input" type="text" />
				</div>
			</div>
		)
	}
})

module.exports = Textbox
