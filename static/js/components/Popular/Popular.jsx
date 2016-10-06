var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Popular.jsx")


// var {goToURL} = require("../../MASAS_functions.jsx")
var { BlurBackground } = require("../MASAS_mixins.jsx")
var { Button, Body } = require("../UI/UI.jsx")


var Popular = React.createClass({
	mixins: [ BlurBackground ],
	
	propTypes: {
		updateTitle: React.PropTypes.string,
	},

	componentWillMount: function() {
		this.props.updateTitle('Popular', '0')
	},

	render: function() {
		return (
			<Body noBackground={ true }>
				<div className="popular--wrapper">
					<div className="text">
						<h1>the best of discover</h1>
						<h2>Coming soon!</h2>
					</div>
					<div className="loader--wrapper">
					</div>
					<div className="button--wrapper">
						<Button
							isSecondaryAction={ true }
							isBigButton={ true }
							>
							share your sounds
						</Button>
					</div>
				</div>
			</Body>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Popular)
