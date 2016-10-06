var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Popular.jsx")


var {goToURL} = require("../../MASAS_functions.jsx")
var { BlurBackground, MobileBlurBackground } = require("../MASAS_mixins.jsx")
var { Button, Body, MasasSpinner } = require("../UI/UI.jsx")


var Popular = React.createClass({
	mixins: [ BlurBackground ],
	
	propTypes: {
		updateTitle: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			spinnerProgress: 0, 
		};
	},

	componentWillMount: function() {
		this.props.updateTitle('Popular', '0')
	},

	componentDidMount: function() {
		// store masas spinner progress in this so we can clear it on unmount
		var counter = 0
		this.timer = window.setInterval( () => {
			counter = counter + 0.01
			if(counter > 1)
				window.clearInterval(this.timer)

			this.setState({ spinnerProgress: counter})	
		}, 50)
	},
	
	componentWillUnmount: function() {
		window.clearInterval(this.timer)
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
						<MasasSpinner
							progress={ this.state.spinnerProgress }
							size={ 150 }
							triggerStart={ 1 }
							/>
					</div>
					<div className="button--wrapper">
						<Button
							isSecondaryAction={ true }
							isBigButton={ true }
							onClick={ () => goToURL('/upload') }
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
