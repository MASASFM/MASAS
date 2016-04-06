// element depends on size of document.getElementsByClassName('pickTime--wrapper')[0]

// COMPONENT ONLY LOOSELY COUPLED WITH REDUX

// component reads from redux state through props passed by parent
// component updates pickTimeUpload state variable through a dispatch function passed by its parent through a prop
// this dispatch only occurs when need be (when the time interval chosen by the user changes)
// this is because the slider is discretized in 100 points and pickTimeUpload only in 6
// It is important to keep pickTimeUpload in the general app state (redux)
// the loose coupling is done because strong coupling (with slider value) induced heavy lag of the sun movement
// when changing the slider value

// sun initial position is still hardcoded in the component and needs to be synced manually with the redux initial state
// to take into account the case when a user submits a song with the default slider value

var React = require("react")
var ReactDOM = require("react-dom")
var $ = require("jquery")

// maps the slider value to sun coordinates
var mapSliderToHeight =  function(x) {

}

var pixelRatio = () => {
	return 1 // paper.view.pixelRatio
}

var TimePicker = React.createClass({
	propTypes: {
		// rangePercent: React.PropTypes.number		// number from 0 to 1 defining place of timer and of sun on canvas
		// canvasHeight: React.PropTypes.number		// canvas height in px
		// canvasWidth: React.PropTypes.number		// canvas width in px
	},

	getInitialState: function() {
		return {
			rangePercent: 33,					// (number) 0-100, slider value
			sunCoords: { x: 0, y: 0 },				// (obj) sun coordinates
			canvasHeight: 0,					// (number) sun arc path center
			canvasWidth: 0,					// (number) sun arc path radius
			arcCenterCoords: { x: 0, y: 0 },				// (object) center of arc circle coord
			arcRadius: 0						// (number) sun arc path radius
		}
	},

	componentDidMount: function() {
		// add event to get new canvas dimensions on resize
		$(window).bind("resize", this.updateCanvasDim)

		// get canvas dim on initial render
		this.updateCanvasDim()
	},

	componentWillUnmout: function() {
		$(window).unbind('resize', this.updateCanvasDim)
	},

	updateCanvasDim: function() {
		// GET CANVAS DIMENSIONS AND RESIZE IF NECESSARY
		var canvas = document.getElementById('timePicker-canvas')
		var canvasWrapper = document.getElementsByClassName('pickTime--wrapper')[0]
		
			// get canvas dimensions from styles
		var canvasHeight = window.getComputedStyle(canvasWrapper).height
		var canvasWidth = window.getComputedStyle(canvasWrapper).width
		canvasHeight = parseInt(canvasHeight.split("p")[0])
		canvasWidth = parseInt(canvasWidth.split("p")[0])
		
			// update canvas size
		paper.view.viewSize = new paper.Size(canvasWidth, canvasHeight)

			// define sun arc path center and radius (magic numbers used for ajusting curves)
		var arcRadius = canvasWidth / 1.9
		var arcCenterCoords = { x: canvasWidth / 2, y: arcRadius + 15 }

		// SAVE DIMENSIONS IN STATE VARS
		this.setState({ canvasHeight, canvasWidth, arcCenterCoords, arcRadius })
	},

	renderSunArcPath: function() {
		var canvas = document.getElementById('timePicker-canvas')

		// SETUP PAPER JS
		paper.setup(canvas)

		//DRAW AND STYLE ARC CIRCLE
			// draw arc from circle radius and center
		var center = new paper.Point(this.state.arcCenterCoords.x, this.state.arcCenterCoords.y)
		var path = new paper.Path.Circle(center, this.state.arcRadius)
		
			// style path
		path.strokeColor = 'white'
		path.opacity = 0.5
		path.dashArray = [5, 6]
		path.strokeWidth = 2

		// DRAW PATH ON CANVAS
		paper.view.draw()

	},

	handleSliderChange: function(e) {
		var sunCoords = this.getSunCoords(e.target.value)

		// call method that will update redux pickTimeUpload variable only if it has changed
		this.props.onChange(e.target.value, this.props.pickTimeUpload)

		// update local state
		this.setState({ rangePercent: e.target.value, sunCoords })
	},

	getSunCoords: function(sliderValue) {
		var { sqrt, pow } = Math

		var R = this.state.arcRadius
		var C = this.state.arcCenterCoords
		var x = sliderValue / 100 * this.state.canvasWidth
		var y = -sqrt( pow( R, 2 ) - pow( x - C.x, 2 ) ) + C.y

		return { x: x / pixelRatio(), y: y / pixelRatio() }
	},

	getHashtag: function() {
		switch(this.props.pickTimeUpload) {
			case 1:
				return	"#EarlyMorning"
			case 2:
				return	"#LateMorning"
			case 3:
				return	"#EarlyAfternoon"
			case 4:
				return	"#LateAfternoon"
			case 5:
				return	"#EarlyEvening"
			case 6:
				return	"#LateEvening"
			default:
				return
		}
	},

	render: function() {
		this.renderSunArcPath()

		// accounting for sun icon size
		var sunIconSize = 40	// px
		var sunCoords = this.getSunCoords(this.state.rangePercent)
		var top = sunCoords.y - sunIconSize / 2
		var left = sunCoords.x - sunIconSize / 2
		var height = sunIconSize + "px"
		var width = sunIconSize + "px"

		// styling and positioning sun icon
		var sunIconStyle = {
			position: 'absolute',
			top,
			left,
			height,
			width,
			zIndex: 1
		}

		return (
			<div className="timePicker--wrapper">
				<canvas id="timePicker-canvas"></canvas>
				<div className="timePicker-slider--wrapper">
					<input type="range" value={ this.state.rangePercent } onChange={ this.handleSliderChange } className="MASAS-slider" />
					<div className="timeRange-hashtag">
						{ this.getHashtag() }
					</div>
				</div>
				<img src="/static/img/time-picker-sun.png" style={sunIconStyle} />
			</div>
		)
	}
})

module.exports = TimePicker