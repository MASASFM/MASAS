// STATEFULL COMPONENT
// no performant enough to be fuly coupled with redux, so no 2 way binding between redux state and slider value. 
// instead, slider value binded 2 ways with inner state var calling this.props.onChange when slider movement is
// triggered.

var React = require("react")
var ReactDOM = require("react-dom")

var $ = require("jquery")
var NoUISlider = require("react-nouislider")

// maps the slider value to sun coordinates
var mapSliderToHeight =  function(x) {

}

var pixelRatio = () => {
	return 1 // paper.view.pixelRatio
}

var TimePicker = React.createClass({

	propTypes: {
		initialDiscover: React.PropTypes.number.isRequired, 			// 1-6 starting slider position	
		currentDiscover: React.PropTypes.number.isRequired, 		// 1-6 used to check if necessary to call onChange calback
		onSliderChange: React.PropTypes.func,	 			// callback called when slider changes
		wrapperClassName: React.PropTypes.string,				// class used to size TimePicker
		canvasId: React.PropTypes.string,					// canvas id used for drawing
		showHashtag: React.PropTypes.bool,					// should hashtag be shown for current slider position
		sliderValue: React.PropTypes.number,					// slider value affecting sun position
	},

	getInitialState: function() {
		// const rangePercent = (this.props.initialDiscover-0.5)*100/6
		// const rangePercent = this.props.rangePercent
		return {
			rangePercent: this.rangePercent,			// (number) 0-100, slider value
			sunCoords: { x: 0, y: 0 },				// (obj) sun coordinates
			canvasHeight: 0,					// (number) sun arc path center
			canvasWidth: 0,					// (number) sun arc path radius
			arcCenterCoords: { x: 0, y: 0 },				// (object) center of arc circle coord
			arcRadius: 0,						// (number) sun arc path radius
		}
	},

	getDefaultProps: function() {
		return {
			showHashtag: true,
			sliderValue: -1,
			renderForUITip: false,
			onSliderChange: () => {}
		}
	},

	componentDidMount: function() {
		// add event to get new canvas dimensions on resize
		$(window).bind('resize', this.updateCanvasDim)

		// get canvas dim on initial render
		this.setupPaperJS()
		this.updateCanvasDim()
	},

	componentWillUnmount: function() {
		$(window).unbind('resize', this.updateCanvasDim)
	},

	setupPaperJS: function() {
		var canvas = this.refs.canvas

		// SETUP PAPER JS
		paper.setup(canvas)
	},

	updateCanvasDim: function() {
		// GET CANVAS DIMENSIONS AND RESIZE IF NECESSARY
		// var canvas = document.getElementById(this.props.canvasId)
		// var canvasWrapper = document.getElementsByClassName(this.props.wrapperClassName)[0]
		var canvas = this.refs.canvas
		var canvasWrapper = this.refs.canvasWrapper


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
		this.setupPaperJS()

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

	handleTimePickerChange: function(rangeValue, currentDiscover) {
		var newDiscover = Math.floor(rangeValue/100*6) + 1

		if(newDiscover > 6)
			newDiscover = 6
		if(newDiscover < 0)
			newDiscover = 0

		if(newDiscover !== currentDiscover){
			return newDiscover
		}
		else{
			return 0
		}
	},

	handleSliderChange: function(e) {
		var sunCoords = this.getSunCoords(parseFloat(e))
		
		// check if need to update redux state
		const newDiscover = this.handleTimePickerChange(parseFloat(e), this.props.currentDiscover)
		if(newDiscover !== 0)
			this.props.onSliderChange(newDiscover)

		// update local state
		// this.setState({ rangePercent: parseFloat(e), sunCoords })
	},

	getSunCoords: function(sliderValue) {
		var { sqrt, pow } = Math

		if(sliderValue > 100) 
			sliderValue = 100
		else if(sliderValue < 0)
			sliderValue = 0
		
		var R = this.state.arcRadius
		var C = this.state.arcCenterCoords
		var x = sliderValue / 100 * this.state.canvasWidth
		var y = -sqrt( pow( R, 2 ) - pow( x - C.x, 2 ) ) + C.y

		return { x: x / pixelRatio(), y: y / pixelRatio() }
	},

	getHashtag: function(value) {
		// used because component initially renders twice (once before componentDidMount
		// and once after the canvas is resized
		// if(this.renderNumber <= 2 )
		// 	switchVar = this.props.initialDiscover

		if(value < 0)
			value = 0

		if(value > 100)
			value = 100

		if(value >= 0 && value < 100/6)
			return "#EarlyMorning"
		else if(value >= 100/6 && value < 2*100/6)
			return "#LateMorning"
		else if(value >= 2*100/6 && value < 3*100/6)
			return "#EarlyAfternoon"
		else if(value >= 3*100/6 && value < 4*100/6)
			return "#LateAfternoon"
		else if(value >= 4*100/6 && value < 5*100/6)
			return "#EarlyEvening"
		else if(value >= 5*100/6 && value <= 100)
			return "#LateEvening"
	},

	componentDidUpdate: function() {
		// var canvas = document.getElementById(this.props.canvasId)
		var canvas = this.refs.canvas
		if(canvas)
			this.renderSunArcPath()
	},

	render: function() {
		if(!this.renderNumber)
			this.renderNumber = 1
		else if(this.renderNumber < 5)
			this.renderNumber = this.renderNumber + 1

		// accounting for sun icon size
		var sunIconSize = 45	// px
		var sunCoords = this.getSunCoords(this.props.sliderValue === -1 ? this.state.rangePercent : this.props.sliderValue)
		var top = sunCoords.y - sunIconSize / 2
		var left = sunCoords.x - sunIconSize / 2
		var height = sunIconSize + "px"
		var width = sunIconSize + "px"

		// styling and positioning sun icon
		var sunIconStyle
		if(!isNaN(top))
			sunIconStyle = {
				position: 'absolute',
				top,
				left,
				height,
				width,
				zIndex: 1
			}
		else
			sunIconStyle = {
				left: 0
			}

		const newDiscover = this.handleTimePickerChange(this.state.rangePercent, this.props.currentDiscover)
		if(newDiscover !== 0) {
			window.setTimeout(() => this.props.onSliderChange(newDiscover), 0)
		}

		return (
			<div className={ "MASAS-time-picker " + this.props.wrapperClassName} ref="canvasWrapper">
				<canvas id={this.props.canvasId} ref="canvas"></canvas>
				<div className="timePicker-slider--wrapper">
					<div style={{
						position: "relative",
						width: "100%",
						height: "100%" }}>
						{/*<input 
							type="range" 
							ref="slider"
							value={ this.props.sliderValue === -1 ? this.state.rangePercent : this.props.sliderValue } 
							onChange={ this.handleSliderChange } 
							className="MASAS-slider" />*/}
						<hr style={{
							position: "absolute",
							right: 0,
							left: 0,
							bottom: "1rem",
							zIndex: "-2"
						}}/>
						<img 
							src="/static/img/MASAS_slider_thumb_icon.svg"
							style={{
								position: "absolute",
								bottom: "1rem",
								left: sunIconStyle.left,
								transform: "translateY(37%)",
								zIndex: "-1"
							}} 
							alt="slider thumb icon"/>
					</div>
					<div className="timeRange-hashtag">
						{ 
							this.props.showHashtag ?
								this.getHashtag(this.props.sliderValue === -1 ? this.state.rangePercent : this.props.sliderValue) 
							:
								""
						}
					</div>
				</div>
				<img src="/static/img/time-picker-sun.png" style={sunIconStyle} />
			</div>
		)
	}
})

module.exports = TimePicker