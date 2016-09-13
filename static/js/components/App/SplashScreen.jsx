var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/SplashScreen.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")


var SplashScreen = React.createClass({
	propTypes: {
	},

	getInitialState: function() {
		return {
			login: false
		}
	},

	componentDidMount: function() {
		this.hashtagSwiper = new Swiper('.hashtag-swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			autoplay: 2500,
		})

		this.mainSwiper = new Swiper('.main-swiper-container', {
		})
	},

	slideNext: function() {
		this.mainSwiper.slideNext()
	},

	slidePrev: function() {
		this.mainSwiper.slidePrev()
	},

	render: function() {

		return (
			<div className={ "splash-screen--wrapper " + (this.state.login ? "login" : "") }>
				<div className="swiper-container main-swiper-container">
					<div className="swiper-wrapper main-swiper-wrapper">

						<div className="swiper-slide first-slide">
							<img src="/static/img/MASAS_logo_tipi.svg" alt="MASAS-logo" />
							<div 
								className="main-content"
								opacity>
								<h1>music by the mood</h1>

								<div className="swiper-container hashtag-swiper-container">
									<div className="swiper-wrapper hashtag-swiper-wrapper">
										<div className="swiper-slide">#EarlyMorning</div>
										<div className="swiper-slide">#LateMorning</div>
										<div className="swiper-slide">#EarlyAfternoon</div>
										<div className="swiper-slide">#LateAfternoon</div>
										<div className="swiper-slide">#EarlyEvening</div>
										<div className="swiper-slide">#LateEvening</div>
									</div>

									<div className="swiper-pagination"></div>
								</div>
								<div className="login-buttons--wrapper">
									<Button
										onClick={ this.slideNext } 
										isSecondaryAction={ true }>Sign-In</Button>
									<Button
										onClick={ this.slideNext } 
										>Sign-Up</Button>
								</div>
							</div>
						</div>

						<div className="swiper-slide">
							<div className="login-content">
								<Button
									onClick={ this.slidePrev } 
									isSecondaryAction={ true }>
									Back
								</Button>
								<Button
									onClick={ this.showLogin }>
									Login
								</Button>
								<div onClick={ this.slideNext }>
									term
								</div>
							</div>
						</div>

						<div className="swiper-slide">
							<h1>terms</h1>
							<Button
								onClick={ this.slidePrev } 
								isSecondaryAction={ true }>
								Back
							</Button>
						</div>


					</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(SplashScreen)