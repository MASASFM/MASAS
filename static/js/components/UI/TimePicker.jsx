var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TimePickerInside.jsx")

var TimePickerInside = require("./TimePickerInside.jsx")
var NoUISlider = require("react-nouislider")
// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var TimePickerWrapper = React.createClass({
	propTypes: {
		initialDiscover: React.PropTypes.number.isRequired, 			// 1-6 starting slider position	
		currentDiscover: React.PropTypes.number.isRequired, 		// 1-6 used to check if necessary to call onChange calback
		onSliderChange: React.PropTypes.func,	 			// callback called when slider changes
		wrapperClassName: React.PropTypes.string,				// class used to size TimePicker
		canvasId: React.PropTypes.string,					// canvas id used for drawing
		showHashtag: React.PropTypes.bool,					// should hashtag be shown for current slider position
		sliderValue: React.PropTypes.number,					// slider value affecting sun position
		initText: React.PropTypes.string,					// string instead of hashtag until slider is moved
	},

	getDefaultProps: function() {
		return {
			initialDiscover: 1,
			currentDiscover: 1,
			onSliderChange: () => {},
		}
	},

	componentWillMount: function() {
	},

	updateCanvas: function(e) {
		if(this.refs.canvas !== undefined)
			this.refs.canvas.setState({ rangePercent: parseFloat(e) })
	},

	shouldComponentUpdate(nextProps, nextState) {
		// don't rerender if current discover changes
		if(nextProps.currentDiscover !== this.props.currentDiscover)
			return false

		return true
	},

	render: function() {
		const startValue = (this.props.initialDiscover-0.5)*100/6

		return (
			<div className="time-picker-wrapper-comp">
				<NoUISlider 
					range={{ min: 0, max: 100}}
					start={[startValue]} 
					onUpdate={ this.updateCanvas }
					/>
				<TimePickerInside 
					{ ...this.props }
					ref="canvas"
					rangePercent={ startValue }
					/>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(TimePickerWrapper)