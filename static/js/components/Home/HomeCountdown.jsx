// HACK NECESSARY TO HANDLE INTERVALS (magic numbers)
			// 	// bottom tipi and subtitle
			// if(stateHeight > 0.115 && stateHeight < 0.195)
			// 	stateHeight = 0.18
			// 	// subtitle and MASAS
			// if(stateHeight > 0.22875 && stateHeight < 0.282)
			// 	stateHeight = 0.282
			// 	// MASAS and circle
			// if(stateHeight > 0.39375 && stateHeight < 0.44)
			// 	stateHeight = 0.44
			// 	// circle and tipi
			// if(stateHeight > 0.80875 && stateHeight < 0.89)
			// 	stateHeight = 0.89

			// // BOUNDARY CONDITIONS
			// 	// handle top boundary
			// if(stateHeight > 0.978)
			// 	stateHeight = 0.978
			// 	// handle bottom boundary
			// if(stateHeight < 0.02)
			// 	stateHeight = 0.02



var React = require("react")

var { goToURL } = require("../../MASAS_functions.jsx")
var { getSongCount } = require("./ajaxCalls.jsx")

var { Button } = require("../UI/UI.jsx")


var HomeCountdown = React.createClass({
	getInitialState: function() {
		// protect against render bug where if this.state.height === 0 the canvas draws dissapear on mouse move
		var numberOfArtists = 0
		var artists = numberOfArtists/800

		return {
			numberOfArtists: numberOfArtists,
			height: artists, 
			width: window.innerWidth,       // WIDTH OF BROWSER WINDOW
			loginButtonPosition: {x: 0, y: 0} // absolute position of login button in px (DUMMY STATE USED TO TRIGGER RERENDER)
		}
	},

	componentWillMount: function() {

		var successFunc = (songs) => {
			var songCount = songs.count
			const songCountGoal =170
			if(songCount > songCountGoal)
				songCount = songCountGoal

			this.setState({ height: songCount/songCountGoal })
		}

		getSongCount(successFunc)
	},

	attributes: {
		loginButtonPosition: {x: 0, y: 0}     // absolute position of login button in px
	},

	componentWillUnmount: function() {
		window.removeEventListener("resize", this.positionButtons)
	},

	updateDimensions: function() {
		this.setState({width: window.innerWidth})
		this.drawLine()
	},

	componentDidMount: function() {
		window.addEventListener("resize", this.positionButtons)
		this.drawLine()
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(this.state.height !== prevState.height)
			this.drawLine()
	},

	drawLine: function() {

		// DEFINE LOGO COLOR
		var logoColor = 'white'

		// Get a reference to the canvas object
		var canvas = document.getElementById('myCanvas')


		// SUBTRACTION NEEDED BECAUSE OF DO-WHILE LOOP
		// variable will change because of sections of the logo with no intersections. We therefore store state.height into new variable (that will increase when no intersection at state.height)
		var stateHeight = this.state.height // - 0.01;   

		// INIT VAR
		var rightMostPoint = null      // right most intersection of level line and logo
		if(canvas) {
			// HACK NECESSARY TO HANDLE INTERVALS (magic numbers)
				// bottom tipi and subtitle
			if(stateHeight > 0.114 && stateHeight < 0.203)
				stateHeight = 0.203
				// subtitle and MASAS
			if(stateHeight > 0.228 && stateHeight < 0.289)
				stateHeight = 0.289
				// MASAS and circle
			if(stateHeight > 0.393&& stateHeight < 0.445)
				stateHeight = 0.445
				// circle and tipi
			if(stateHeight > 0.808 && stateHeight < 0.897)
				stateHeight = 0.897

			// BOUNDARY CONDITIONS
				// handle top boundary
			if(stateHeight > 0.978)
				stateHeight = 0.978
				// handle bottom boundary
			if(stateHeight < 0.02)
				stateHeight = 0.02

			// Create paper.js canvas
			paper.setup(canvas)

			// Size canvas
			var desiredWidth = window.innerWidth // window width
			var desiredHeight = document.getElementById('masasLoaderContainer').style.height // height of canvas depends on canvas container. 
			desiredHeight = parseInt(desiredHeight.substring(0, desiredHeight.length - 2))  // convert '#px' to # (str -> num)
			paper.view.viewSize = new paper.Size(desiredWidth, desiredHeight) // update canvas size

			// IMPORT LOGO ON CANVAS (on first layer)
			// create first layer
			var firstLayer = paper.project.activeLayer 
			var logoBottom = paper.project.importSVG(document.getElementById('svg'))
			logoBottom.visible = true // Turn off the effect of display:none;
			logoBottom.strokeColor = logoColor
			logoBottom.position = paper.view.center            // center logo
			var scaleFactor = desiredHeight/365        // scale logo (365 = magic number height, logo height)
			logoBottom.scale(scaleFactor)

			// CREATE CROPPING RECTANGLE TO GENERATE BOTTOM PART OF LOGO
			// calculate horizontal line height
			var lineHeight = (1-stateHeight)*document.getElementById('myCanvas').height/ paper.view._pixelRatio
			var croppingRectangle = new paper.Rectangle(new paper.Point(0,lineHeight), new paper.Size(desiredWidth, paper.view.size._height-lineHeight))
			var croppingRectangle = new paper.Path.Rectangle(croppingRectangle)
			croppingRectangle.clipMask = true

			// GENERATE SHADDED TOP PART OF LOGO (above leve live)
			// create second layer
			var secondLayer = new paper.Layer()

			// reimport logo on secondLayer
			var logoTop = paper.project.importSVG(document.getElementById('svg'))
			logoTop.visible = true
			logoTop.strokeColor =  logoColor
			logoTop.opacity = 0.5
			logoTop.position = paper.view.center
			logoTop.scale(scaleFactor)

			// CREATE CROPPING RECTANGLE TO GENERATE TOP PART OF LOGO
			var croppingRectangle = new paper.Rectangle(new paper.Point(0,0), new paper.Size(this.state.width-200, lineHeight))
			var croppingRectangle = new paper.Path.Rectangle(croppingRectangle)
			croppingRectangle.clipMask = true

			// REACTIVATE FIRST LAYER
			firstLayer.activate()
			
			// DRAW INVISIBLE HORIZONTAL LINE AT DESIRED HEIGHT
			// calculate horizontal line height
			var lineHeight = (1-stateHeight)*document.getElementById('myCanvas').height/ paper.view._pixelRatio
			var start5 = new paper.Point(0,lineHeight)
			var end5 = new paper.Point(800,lineHeight)
			var path5 = new paper.Path.Line(start5, end5)
			path5.strokeColor = logoColor
			path5.strokeColor.alpha = 0

			// FUNCTION THAT RETURNS ALL INTERSECTIONS BETWEEN 2 PATHS
			var showIntersections = function(path1, path2) {
				var intersections = path1.getIntersections(path2)

				return intersections
			}

			var intersections = []   // array containing all intersection points

			// FIND INTERSECTIONS BETWEEN HORIZONTAL LINE AND DIFFERENT LOGO LINED (needed because letter MAA and SS in MASAS are in two different groups)
			for (var i = 0; i < logoBottom.children.length; i++) {
				if(showIntersections(logoBottom.children[i], path5).length > 0)
					intersections = showIntersections(logoBottom.children[i], path5)
			}

			// FUNCTION RETURNING RIGHT MOST POINT OF INTERSECTION
			var getRightMostPoint = function(intersections) {
				if(intersections.length > 1) {
					rightMostPoint = intersections[0]._point
					for (var i = 1; i < intersections.length; i++) {
						if(intersections[i]._point.x > rightMostPoint.x)
							rightMostPoint = intersections[i]._point
					}
				} else if(intersections.length === 1)
					rightMostPoint = intersections[0]
				else
					rightMostPoint = 0

				return rightMostPoint
			}
			var rightMostPoint = getRightMostPoint(intersections)

			// DRAW HORIZONTAL LINE FROM RIGHT OF LOGO (also scale length of line)
			// create third layer
			var thirdLayer = new paper.Layer()
			var startPt = new paper.Point(rightMostPoint.x,lineHeight+0.1)
			var endPt = new paper.Point(rightMostPoint.x+scaleFactor*236,lineHeight+0.1)
			var horizontalLine = new paper.Path.Line(startPt, endPt)
			horizontalLine.strokeColor = logoColor
			horizontalLine.strokeColor.alpha = 1
			horizontalLine.strokeWidth = 0.5

			// position button
			var fontSize = 12
			var textStartPoint = new paper.Point(endPt.x + 10, lineHeight+(fontSize/(2*paper.view._pixelRatio)))
			this.positionButtons(textStartPoint)
			

			// firstLayer.activate();
			// FILL CIRCLE AND S LETTERS
			var logoStrokeWidth = 0.5
				// Top logo
			var SandSLetters = logoBottom.children.SandSLetters
			SandSLetters.fillColor =  logoColor
			SandSLetters.strokeWidth = logoStrokeWidth + 0.2
			var circle = logoBottom.children.mCircle
			circle.fillColor =  logoColor
			circle.strokeWidth = logoStrokeWidth

			var mLogo = logoBottom.children.mLogo
			mLogo.strokeWidth = logoStrokeWidth + 2.05
			mLogo.fillColor.alpha =  0
			var tipiLines = logoBottom.children.tipiLines
			tipiLines.strokeWidth = logoStrokeWidth + 1.62
			var MAAletters = logoBottom.children.MAAletters
			MAAletters.strokeWidth = logoStrokeWidth + 1.62
			MAAletters.fillColor.alpha =  0

			var subtitle = logoTop.children.subtitle
			subtitle.strokeWidth = 0.5

				// Bottom logo
			var SandSLetters = logoTop.children.SandSLetters
			SandSLetters.fillColor =  logoColor
			var circle = logoTop.children.mCircle
			circle.fillColor =  logoColor
			circle.strokeWidth = logoStrokeWidth

			var mLogo = logoTop.children.mLogo
			mLogo.strokeWidth = logoStrokeWidth + 2.05
			mLogo.fillColor.alpha =  0
			var tipiLines = logoTop.children.tipiLines
			tipiLines.strokeWidth = logoStrokeWidth + 1.62
			var MAAletters = logoTop.children.MAAletters
			MAAletters.strokeWidth = logoStrokeWidth + 1.62
			MAAletters.fillColor.alpha =  0

			var subtitle = logoBottom.children.subtitle
			subtitle.strokeWidth = 0.5


			paper.view.draw()
		}
	},

	positionButtons: function(textPosition) {
		var yCoord = textPosition.y
		var xCoord = textPosition.x

		this.attributes.loginButtonPosition = {x: xCoord, y: yCoord}
		this.setState({loginButtonPosition: {x: xCoord, y: yCoord}})     // DUMMY STATE USED TO RERENDER
	},

	signUpButtonClick: function() {
	},

	render: function() {

		var positionLinks = {
			position: 'absolute', 
			left: this.attributes.loginButtonPosition.x - 0, 
			top: this.attributes.loginButtonPosition.y - 20,
			width: '6rem'
		}

		var pageHeight = $(window).height()
		var logoHeight = pageHeight * 0.35

		return (
			<div className="HomeCountdown--wrapper1">
				<div id='masasLoaderContainer' style={{ position: 'relative', height: logoHeight + 'px' }} className={ "HomeCountdown--wrapper2" /* + (this.props.user ? ' logged-in' : '') */}>
					<div style={positionLinks}>
							{ this.props.user ?
								<Button 
									onClick={ goToURL.bind(null, '/upload') } 
									className="home-countdown-button"
									isSecondaryAction={true} 
									isBigButton={true}>Start Uploading</Button>
								:
								<Button 
									onClick={ goToURL.bind(null, '/login') } 
									className="home-countdown-button"
									isSecondaryAction={true} 
									isBigButton={true}>Get Early Access</Button>
							}
					</div>

					<div style={{ position: "relative" }}>
						<canvas id="myCanvas">
						</canvas>

						{/* point is to cover canvas because it dissapears on mouse over sometimes. no idea why. */}
						<div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
						</div>
					</div>

					<svg id='svg' style={{display: 'none', height: '236px'}}>
						<path xmlns="http://www.w3.org/2000/svg" id="mLogo" className="M-logo" d="M19 375.5l-24.5-49.3-24 49.3m18.4-11l-19.5-38.3-24.1 49.3m45.3-41.1l21.1 41.1m-42.3-49.3l25.4 49.3" />

						<path xmlns="http://www.w3.org/2000/svg" id="MAAletters" className="MAA-letters" d="M-71.1 476.5l-20.2-40.6-19.8 40.6m15.2-9.1l-16.1-31.5-19.8 40.6m37.3-33.9l17.3 33.9m-34.8-40.6l20.9 40.6m67.4-.4l-20.1-40.5-19.9 40.5m16.6-33.8l17.4 33.8m90.8 0l-20.2-40.5-19.8 40.5m16.5-33.8L55 476.1" />

						<path xmlns="http://www.w3.org/2000/svg" id="SandSLetters" d="M13.3 465.3c0 1.9-.4 3.5-1.2 4.9-.8 1.4-1.9 2.5-3.2 3.4-1.3.9-2.8 1.6-4.4 2.1s-3.3.7-4.9.7c-2.9 0-5.7-.6-8.2-1.7-2.6-1.1-4.9-2.7-7-4.6-.2-.2-.3-.4-.3-.6s.1-.4.3-.6.4-.3.6-.3.3.1.5.3c2.1 1.8 4.3 3.2 6.6 4.3s4.8 1.6 7.7 1.6c1.4 0 2.9-.2 4.3-.6 1.4-.4 2.7-1 3.8-1.8s2.1-1.8 2.8-3c.7-1.2 1.1-2.6 1.1-4.2 0-1.3-.3-2.4-.9-3.4-.6-.9-1.4-1.7-2.4-2.4s-2.1-1.2-3.4-1.7l-3.9-1.2c-1.3-.3-2.6-.6-3.8-.8-1.2-.2-2.3-.5-3.3-.7-1.1-.3-2.2-.7-3.3-1.3-1-.5-2-1.2-2.7-2-.8-.8-1.4-1.7-1.9-2.7s-.7-2.2-.7-3.5c0-1.7.4-3.3 1.2-4.5.8-1.3 1.8-2.3 3.1-3.2 1.3-.8 2.7-1.5 4.3-1.9 1.6-.4 3.1-.6 4.6-.6 1 0 2 .1 3.3.3 1.2.2 2.4.5 3.6.9 1.2.4 2.4.8 3.4 1.4 1.1.5 2 1.2 2.7 1.8.1.1.2.2.2.3.1.1.1.2.1.4s-.1.4-.3.6c-.2.2-.4.3-.6.3-.1 0-.2-.1-.4-.2s-.4-.2-.6-.4c-.2-.2-.4-.3-.6-.4-.2-.1-.3-.2-.4-.3-1.5-.9-3.2-1.7-4.9-2.2-1.7-.5-3.5-.8-5.4-.8-1.3 0-2.6.2-4 .5s-2.6.8-3.8 1.5c-1.1.7-2.1 1.6-2.8 2.6-.7 1.1-1.1 2.4-1.1 3.9 0 1.6.4 3 1.1 4 .8 1 1.7 1.9 3 2.6 1.2.7 2.6 1.2 4.2 1.6l4.8 1.2c1.7.4 3.3.8 4.8 1.2 1.6.4 3 1.1 4.2 1.8 1.2.8 2.2 1.7 3 2.9.7 1.2 1.1 2.7 1.1 4.5zm85.3 0c0 1.9-.4 3.5-1.2 4.9-.8 1.4-1.9 2.5-3.2 3.4-1.3.9-2.8 1.6-4.4 2.1-1.6.5-3.3.7-4.9.7-2.9 0-5.7-.6-8.2-1.7-2.6-1.1-4.9-2.7-7-4.6-.2-.2-.3-.4-.3-.6s.1-.4.3-.6.4-.3.6-.3.3.1.5.3c2.1 1.8 4.3 3.2 6.6 4.3 2.3 1.1 4.8 1.6 7.7 1.6 1.4 0 2.9-.2 4.3-.6 1.4-.4 2.7-1 3.8-1.8s2.1-1.8 2.8-3 1.1-2.6 1.1-4.2c0-1.3-.3-2.4-.9-3.4-.6-.9-1.4-1.7-2.4-2.4s-2.1-1.2-3.4-1.7l-3.9-1.2c-1.3-.3-2.6-.6-3.8-.8-1.2-.2-2.3-.5-3.3-.7-1.1-.3-2.2-.7-3.3-1.3-1-.5-2-1.2-2.7-2-.8-.8-1.4-1.7-1.9-2.7s-.7-2.2-.7-3.5c0-1.7.4-3.3 1.2-4.5.8-1.3 1.8-2.3 3.1-3.2 1.3-.8 2.7-1.5 4.3-1.9 1.6-.4 3.1-.6 4.6-.6 1 0 2 .1 3.3.3 1.2.2 2.4.5 3.6.9 1.2.4 2.4.8 3.4 1.4 1.1.5 2 1.2 2.7 1.8.1.1.2.2.2.3.1.1.1.2.1.4s-.1.4-.3.6-.4.3-.6.3c-.1 0-.2-.1-.4-.2s-.4-.2-.6-.4c-.2-.2-.4-.3-.6-.4-.2-.1-.3-.2-.4-.3-1.5-.9-3.2-1.7-4.9-2.2s-3.5-.8-5.4-.8c-1.3 0-2.6.2-4 .5s-2.6.8-3.8 1.5c-1.1.7-2.1 1.6-2.8 2.6-.7 1.1-1.1 2.4-1.1 3.9 0 1.6.4 3 1.1 4s1.7 1.9 3 2.6c1.2.7 2.6 1.2 4.2 1.6l4.8 1.2c1.7.4 3.3.8 4.8 1.2 1.6.4 3 1.1 4.2 1.8 1.2.8 2.2 1.7 3 2.9.8 1.2 1.1 2.7 1.1 4.5z" />

						<path xmlns="http://www.w3.org/2000/svg" id='mCircle' className="mCircle" d="M-16.8 287.1c35.4 0 64.2 28.8 64.2 64.2s-28.8 64.2-64.2 64.2S-81 386.7-81 351.3s28.8-64.2 64.2-64.2m0-3.4c-37.3 0-67.6 30.2-67.6 67.6s30.2 67.6 67.6 67.6 67.6-30.2 67.6-67.6c0-37.4-30.3-67.6-67.6-67.6z" />

						<path xmlns="http://www.w3.org/2000/svg" id='tipiLines' className="tipi-lines" d="M-136.2 536.8c-6.6 13.8-13.6 27.8-21.3 41.2M26.4 215.2l-20 39.6M-109.2 536.8c-6.6 13.8-13.6 27.8-21.3 41.2M53.4 215.2l-20 39.6M100 536.8c8.2 12.8 14.2 26.8 21.5 41M-62.6 215.2l20.2 40M91 536.8c8.2 12.8 14.2 26.8 21.5 41M-71.6 215.2l20.4 40.4" />

						<path xmlns="http://www.w3.org/2000/svg" id='subtitle' className="subtitle" d="M-127.4 507.7c0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1l-6.4-8.9v8.7c0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1c-.1 0-.1-.1-.1-.2v-9.4c0-.1 0-.1.1-.2 0-.1.1-.1.2-.1s.1 0 .2.1.2.3.5.6c.2.3.5.7.9 1.2s.7 1 1.1 1.5.8 1.1 1.2 1.7.8 1.1 1.2 1.7c.4.5.7 1 1 1.5.3.4.5.8.7 1.1s.4.3.4.3zm5.2-12.1v12.2c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.1 0-.2-.1c0 0-.1-.1-.1-.2v-11.4l-5.5 7.6c0 .1.1.2.3.4.1.2.3.4.5.7.2.3.4.5.6.8.2.3.4.6.6.8.2.3.3.5.5.7.1.2.2.3.2.3 0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1l-8.7-12.1v-.2c0-.1 0-.1.1-.2 0 0 .1-.1.2-.1s.2 0 .2.1l5.8 8.1 5.8-8.1c0-.1.1-.1.2-.1s.1 0 .2.1c.1 0 .1.1.1.2zM-109.5 507.7c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.2-.1-.2-.2l-4.6-11.6-.5 1.3c0 .1.1.3.3.6.1.3.3.8.5 1.2.2.5.4 1 .6 1.6.2.6.5 1.2.7 1.8.2.6.5 1.2.7 1.8.2.6.4 1.1.6 1.5s.3.8.4 1.1c.1.3.2.4.2.4 0 .1-.1.2-.2.2s-.2-.1-.2-.2l-3.8-9.6-3.7 9.6c0 .1-.1.2-.2.2s-.2-.1-.2-.2c0 0 .1-.2.2-.5s.3-.8.5-1.3.4-1.2.7-1.8c.3-.7.5-1.4.8-2.1s.6-1.5.8-2.2c.3-.7.5-1.4.8-2 .2-.6.4-1.1.6-1.5.2-.4.3-.7.3-.8 0-.1.1-.1.2-.1s.2 0 .2.1.1.4.3.8c.2.4.4.9.6 1.5.2.6.5 1.3.8 2 .3.7.6 1.4.9 2.2l.9 2.1c.3.7.5 1.3.7 1.9.2.5.4 1 .5 1.3.1.5.1.6.1.6zM-99.3 507.8c0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1l-4.3-5.9-2.3 2.3v3.4c0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1-.1-.1-.1-.2v-12c0-.1 0-.1.1-.2s.1-.1.2-.1.1 0 .2.1c.1 0 .1.1.1.2v5.8l6.1-6.1c.1-.1.1-.1.2-.1s.1 0 .2.1.1.1.1.2 0 .1-.1.2l-6.4 6.4v1.5l.3-.3c.2-.2.3-.3.4-.5l.5-.5c.2-.2.4-.3.5-.5l.4-.4.2-.2c.1 0 .2 0 .2.1.1.1.2.3.5.7s.5.7.9 1.2c.3.5.7.9 1.1 1.4.4.5.7 1 1 1.4.3.4.6.8.8 1.1.1.2.2.4.2.5zM-88.4 507.7c0 .1 0 .1-.1.2 0 .1-.1.1-.2.1h-7.8c-.1 0-.1 0-.2-.1s-.1-.1-.1-.2v-12.1c0-.1 0-.1.1-.2.1 0 .1-.1.2-.1h7.8c.1 0 .1 0 .2.1s.1.1.1.2 0 .1-.1.2-.1.1-.2.1h-7.5v4.9h5.9c.1 0 .1 0 .2.1s.1.1.1.2 0 .1-.1.2-.1.1-.2.1h-5.8v1.1h5.9c.2 0 .3.1.3.2s0 .1-.1.2-.1.1-.2.1h-5.9v4.7h7.5c.1 0 .1 0 .2.1s0-.1 0-.1zM-71.7 507.7c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.2-.1-.2-.2l-4.6-11.6-.5 1.3c0 .1.1.3.3.6.1.3.3.8.5 1.2.2.5.4 1 .6 1.6.2.6.5 1.2.7 1.8.2.6.5 1.2.7 1.8.2.6.4 1.1.6 1.5s.3.8.4 1.1c.1.3.2.4.2.4 0 .1-.1.2-.2.2s-.2-.1-.2-.2l-3.8-9.6-3.7 9.6c0 .1-.1.2-.2.2s-.2-.1-.2-.2c0 0 .1-.2.2-.5s.3-.8.5-1.3.4-1.2.7-1.8c.3-.7.5-1.4.8-2.1s.6-1.5.8-2.2c.3-.7.5-1.4.8-2 .2-.6.4-1.1.6-1.5.2-.4.3-.7.3-.8 0-.1.1-.1.2-.1s.2 0 .2.1.1.4.3.8c.2.4.4.9.6 1.5.2.6.5 1.3.8 2 .3.7.6 1.4.9 2.2l.9 2.1c.3.7.5 1.3.7 1.9.2.5.4 1 .5 1.3 0 .5.1.6.1.6zM-55.5 504.6c0 .6-.1 1.1-.4 1.5-.2.4-.6.8-1 1.1-.4.3-.9.5-1.4.6-.5.1-1 .2-1.5.2-.9 0-1.7-.2-2.5-.5s-1.5-.8-2.1-1.4c-.1-.1-.1-.1-.1-.2s0-.1.1-.2.1-.1.2-.1.1 0 .2.1c.7.5 1.3 1 2 1.3.7.3 1.5.5 2.4.5.4 0 .9-.1 1.3-.2s.8-.3 1.2-.6c.4-.2.6-.6.9-.9.2-.4.3-.8.3-1.3 0-.4-.1-.7-.3-1-.2-.3-.4-.5-.7-.7-.3-.2-.7-.4-1.1-.5-.4-.1-.8-.3-1.2-.4l-1.2-.3c-.4-.1-.7-.1-1-.2-.3-.1-.7-.2-1-.4-.3-.2-.6-.4-.8-.6-.2-.2-.4-.5-.6-.8-.1-.3-.2-.7-.2-1.1 0-.5.1-1 .4-1.4s.6-.7 1-1c.4-.3.8-.5 1.3-.6s1-.2 1.4-.2c.3 0 .6 0 1 .1s.7.2 1.1.3c.4.1.7.3 1.1.4.3.2.6.4.8.6l.1.1v.1c0 .1 0 .1-.1.2s-.1.1-.2.1h-.1c-.1 0-.1-.1-.2-.1s-.1-.1-.2-.1-.1-.1-.1-.1c-.5-.3-1-.5-1.5-.7-.5-.2-1.1-.3-1.7-.3-.4 0-.8 0-1.2.2s-.8.3-1.2.5-.6.5-.9.8c-.2.3-.3.7-.3 1.2s.1.9.3 1.2c.2.3.5.6.9.8.4.2.8.4 1.3.5.5.1 1 .2 1.5.4.5.1 1 .2 1.5.4.5.1.9.3 1.3.6.4.2.7.5.9.9.2.1.3.6.3 1.2zM-40.8 501.7c0 .9-.2 1.7-.5 2.5s-.8 1.4-1.4 2c-.6.6-1.2 1-2 1.4s-1.6.5-2.5.5-1.7-.2-2.5-.5-1.4-.8-2-1.4c-.6-.6-1-1.2-1.4-2-.3-.8-.5-1.6-.5-2.5s.2-1.7.5-2.5.8-1.4 1.4-2c.6-.6 1.2-1 2-1.4.8-.3 1.6-.5 2.5-.5s1.7.2 2.5.5 1.4.8 2 1.4c.6.6 1 1.2 1.4 2s.5 1.6.5 2.5zm-.5 0c0-.8-.2-1.6-.5-2.3-.3-.7-.7-1.3-1.3-1.9-.5-.5-1.2-1-1.9-1.3s-1.5-.5-2.3-.5-1.6.2-2.3.5-1.3.7-1.9 1.3c-.5.5-1 1.2-1.3 1.9s-.5 1.5-.5 2.3.2 1.6.5 2.3c.3.7.7 1.3 1.3 1.9.5.5 1.2 1 1.9 1.3s1.5.5 2.3.5 1.6-.2 2.3-.5 1.3-.7 1.9-1.3 1-1.2 1.3-1.9c.4-.8.5-1.5.5-2.3zM-30.5 504.9c0 .4-.1.8-.2 1.2-.2.4-.4.7-.7 1s-.6.5-1 .7c-.4.2-.8.3-1.2.3h-1.2c-.4 0-.8-.1-1.2-.2-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.2-.4-.2-.8-.2-1.2v-9.3c0-.1 0-.1.1-.2 0 0 .1-.1.2-.1s.1 0 .2.1c0 0 .1.1.1.2v9.3c0 .4.1.7.2 1 .1.3.3.6.6.8.2.2.5.4.8.6.3.1.7.2 1 .2h1.2c.4 0 .7-.1 1-.2.3-.1.6-.3.8-.6.2-.2.4-.5.6-.8.1-.3.2-.7.2-1v-9.3c0-.1 0-.1.1-.2 0 0 .1-.1.2-.1s.1 0 .2.1c0 0 .1.1.1.2v9.2zM-20.2 507.7c0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1L-27 499v8.7c0 .1 0 .1-.1.2s-.1.1-.2.1c-.2 0-.2-.1-.2-.3v-9.5c0-.1 0-.1.1-.2s.1-.1.2-.1.1 0 .2.1.2.3.5.6.5.7.9 1.2.7 1 1.1 1.5.8 1.1 1.2 1.7c.4.6.8 1.1 1.2 1.7.4.5.7 1 1 1.5s.5.8.7 1 .2.5.2.5zm2 0c0 .2-.1.3-.3.3-.1 0-.1 0-.2-.1l-8.7-12.1v-.1c0-.2.1-.3.2-.3s.1 0 .2.1l8.3 11.5v-11.4c0-.1 0-.1.1-.2 0 0 .1-.1.2-.1s.1 0 .2.1c0 0 .1.1.1.2l-.1 12.1zM-4.6 501.6c0 .9-.2 1.7-.5 2.5s-.8 1.4-1.4 2-1.2 1-2 1.3c-.8.3-1.6.5-2.4.5H-13c-.1 0-.1 0-.2-.1 0-.1-.1-.1-.1-.2v-11.9h-1.1v11.9c0 .2-.1.3-.3.3-.1 0-.1 0-.2-.1 0-.1-.1-.1-.1-.2v-12.1c0-.1 0-.1.1-.2 0-.1.1-.1.2-.1h3.7c.9 0 1.7.2 2.4.5.8.3 1.4.8 2 1.4.6.6 1 1.2 1.4 2s.6 1.7.6 2.5zm-.5 0c0-.8-.2-1.6-.5-2.3-.3-.7-.7-1.3-1.2-1.9-.5-.5-1.1-.9-1.8-1.2-.7-.3-1.5-.5-2.3-.5h-1.8v11.6h1.8c.8 0 1.6-.2 2.3-.5.7-.3 1.3-.7 1.8-1.2s.9-1.1 1.2-1.8c.4-.6.5-1.4.5-2.2zM13.1 507.7c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.2-.1-.2-.2L8 496.2l-.5 1.3c0 .1.1.3.3.6.1.3.3.8.5 1.2.2.5.4 1 .6 1.6s.5 1.2.7 1.8c.2.6.5 1.2.7 1.8.2.6.4 1.1.6 1.5s.3.8.4 1.1c.1.3.2.4.2.4 0 .1-.1.2-.2.2s-.2-.1-.2-.2l-3.8-9.6-3.7 9.6c0 .1-.1.2-.2.2s-.2-.1-.2-.2c0 0 .1-.2.2-.5s.3-.8.5-1.3.4-1.2.7-1.8.5-1.4.8-2.1.6-1.5.8-2.2c.3-.7.5-1.4.8-2 .2-.6.4-1.1.6-1.5.2-.4.3-.7.3-.8 0-.1.1-.1.2-.1s.2 0 .2.1.1.4.3.8c.2.4.4.9.6 1.5.2.6.5 1.3.8 2s.6 1.4.9 2.2.6 1.4.9 2.1.5 1.3.7 1.9c.2.5.4 1 .5 1.3.1.5.1.6.1.6zM23 507.7c0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1l-6.3-8.9v8.7c0 .1 0 .1-.1.2l-.1.1c-.2 0-.2-.1-.2-.3v-9.5c0-.1 0-.1.1-.2s.1-.1.2-.1.1 0 .2.1.2.3.5.6c.2.3.5.7.9 1.2.3.5.7 1 1.1 1.5s.8 1.1 1.2 1.7c.4.6.8 1.1 1.2 1.7.4.5.7 1 1 1.5.3.4.5.8.7 1 0 .4.1.5.1.5zm1.9 0c0 .2-.1.3-.3.3-.1 0-.1 0-.2-.1l-8.7-12.1v-.1c0-.2.1-.3.2-.3s.1 0 .2.1l8.3 11.5v-11.4c0-.1 0-.1.1-.2 0 0 .1-.1.2-.1s.1 0 .2.1c0 0 .1.1.1.2l-.1 12.1zM38.6 501.6c0 .9-.2 1.7-.5 2.5s-.8 1.4-1.4 2c-.6.6-1.2 1-2 1.3-.8.3-1.6.5-2.5.5h-2.1c-.1 0-.1 0-.2-.1 0-.1-.1-.1-.1-.2v-11.9h-1.1v11.9c0 .2-.1.3-.3.3-.1 0-.1 0-.2-.1s-.1-.1-.1-.2v-12.1c0-.1 0-.1.1-.2 0-.1.1-.1.2-.1h3.7c.9 0 1.7.2 2.5.5s1.4.8 2 1.4c.6.6 1 1.2 1.4 2s.6 1.7.6 2.5zm-.5 0c0-.8-.2-1.6-.5-2.3-.3-.7-.7-1.3-1.2-1.9-.5-.5-1.1-.9-1.8-1.2-.7-.3-1.5-.5-2.3-.5h-1.8v11.6h1.8c.8 0 1.6-.2 2.3-.5.7-.3 1.3-.7 1.8-1.2s.9-1.1 1.2-1.8c.4-.6.5-1.4.5-2.2zM55 504.6c0 .6-.1 1.1-.4 1.5-.2.4-.6.8-1 1.1s-.9.5-1.4.6c-.5.1-1 .2-1.5.2-.9 0-1.7-.2-2.5-.5s-1.5-.8-2.1-1.4c-.1-.1-.1-.1-.1-.2s0-.1.1-.2.1-.1.2-.1.1 0 .2.1c.7.5 1.3 1 2 1.3.7.3 1.5.5 2.4.5.4 0 .9-.1 1.3-.2s.8-.3 1.2-.6c.4-.2.6-.6.9-.9.2-.4.3-.8.3-1.3 0-.4-.1-.7-.3-1-.2-.3-.4-.5-.7-.7-.3-.2-.7-.4-1.1-.5s-.8-.3-1.2-.4l-1.2-.3c-.4-.1-.7-.1-1-.2-.3-.1-.7-.2-1-.4-.3-.2-.6-.4-.8-.6-.2-.2-.4-.5-.6-.8s-.2-.7-.2-1.1c0-.5.1-1 .4-1.4.2-.4.6-.7 1-1 .4-.3.8-.5 1.3-.6s1-.2 1.4-.2c.3 0 .6 0 1 .1s.7.2 1.1.3c.4.1.7.3 1.1.4.3.2.6.4.8.6l.1.1v.1c0 .1 0 .1-.1.2s-.1.1-.2.1h-.1c-.1 0-.1-.1-.2-.1s-.1-.1-.2-.1-.1-.1-.1-.1c-.5-.3-1-.5-1.5-.7-.5-.2-1.1-.3-1.7-.3-.4 0-.8 0-1.2.2-.4.1-.8.3-1.2.5-.4.2-.6.5-.9.8s-.3.7-.3 1.2.1.9.3 1.2c.2.3.5.6.9.8.4.2.8.4 1.3.5.5.1 1 .2 1.5.4.5.1 1 .2 1.5.4.5.1.9.3 1.3.6.4.2.7.5.9.9.2.1.3.6.3 1.2zM66 507.7c0 .1 0 .1-.1.2s-.1.1-.2.1-.1 0-.2-.1c-.1 0-.1-.1-.1-.2v-5H58v5c0 .2-.1.3-.2.3s-.1 0-.2-.1c0-.1-.1-.1-.1-.2v-12.2c0-.1 0-.1.1-.2 0 0 .1-.1.2-.1s.1 0 .2.1c0 0 .1.1.1.2v5.2h7.4v-5.2c0-.1 0-.1.1-.2.1 0 .1-.1.2-.1s.1 0 .2.1c.1 0 .1.1.1.2v12.2zm-.5-5.4v-1.1h-7.4v1.1h7.4zM78.7 507.7c0 .1 0 .1-.1.2 0 0-.1.1-.2.1s-.2-.1-.2-.2l-4.6-11.6-.5 1.3c0 .1.1.3.3.6.1.3.3.8.5 1.2.2.5.4 1 .6 1.6s.5 1.2.7 1.8c.2.6.5 1.2.7 1.8.2.6.4 1.1.6 1.5s.3.8.4 1.1c.1.3.2.4.2.4 0 .1-.1.2-.2.2s-.2-.1-.2-.2l-3.8-9.6-3.7 9.6c0 .1-.1.2-.2.2s-.2-.1-.2-.2c0 0 .1-.2.2-.5s.3-.8.5-1.3.4-1.2.7-1.8.5-1.4.8-2.1.6-1.5.8-2.2c.3-.7.5-1.4.8-2 .2-.6.4-1.1.6-1.5.2-.4.3-.7.3-.8 0-.1.1-.1.2-.1s.2 0 .2.1.1.4.3.8c.2.4.4.9.6 1.5.2.6.5 1.3.8 2s.6 1.4.9 2.2.6 1.4.9 2.1.5 1.3.7 1.9c.2.5.4 1 .5 1.3.1.5.1.6.1.6zM88.8 498.2c0 .4-.1.7-.2 1.1-.1.3-.3.6-.5.9-.2.3-.5.5-.8.6-.3.2-.7.3-1 .3H83.1v1.1H86c.1 0 .2 0 .2.1s.1.3.3.6.3.6.5 1 .4.8.6 1.3c.2.4.4.9.6 1.2.2.4.3.7.4 1 .1.3.2.4.2.4 0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.2 0-.2-.1l-2.4-5.2h-2.8v5.1c0 .1 0 .1-.1.2-.1 0-.1.1-.2.1s-.1 0-.2-.1c0 0-.1-.1-.1-.2v-11.8h-1V508c0 .1 0 .1-.1.2s-.1.1-.2.1-.1 0-.2-.1c0 0-.1-.1-.1-.2v-12.2c0-.2.1-.2.2-.2H86c.4 0 .8.1 1.1.2s.7.3.9.6c.3.3.5.6.6.9.2.1.2.5.2.9zm-.5 0c0-.3-.1-.6-.2-.9-.1-.3-.3-.5-.5-.7-.2-.2-.5-.4-.8-.5s-.6-.2-.9-.2h-2.8v4.7H86c.3 0 .6-.1.9-.2.3-.1.5-.3.8-.5s.4-.5.5-.8.1-.6.1-.9zM99.8 507.7c0 .1 0 .1-.1.2s-.1.1-.2.1h-7.8c-.1 0-.1 0-.2-.1s-.1-.1-.1-.2v-12.1c0-.1 0-.1.1-.2.1 0 .1-.1.2-.1h7.8c.1 0 .1 0 .2.1 0 0 .1.1.1.2s0 .1-.1.2c0 0-.1.1-.2.1H92v4.9h5.9c.1 0 .1 0 .2.1 0 0 .1.1.1.2s0 .1-.1.2c0 0-.1.1-.2.1h-5.8v1.1H98c.2 0 .3.1.3.2s0 .1-.1.2-.1.1-.2.1h-5.9v4.7h7.5c.1 0 .1 0 .2.1v-.1z"/>
					</svg>
				</div>
				<div className={ "mobile-logo logged-out" /*+ (!this.props.user ? ' logged-out' : '') */ }>
					<img src="/static/img/MASAS_logo_tipi.svg" alt="logo" />
				</div>
			</div>
		)
	}
})

module.exports = HomeCountdown