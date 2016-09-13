var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/SplashScreen.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")
var LoginForm = require("../Login/LoginForm.jsx")
var Legals = require("../Legals/LegalsHome.jsx")


var SplashScreen = React.createClass({
	propTypes: {
		splashScreenPage: React.PropTypes.number,

		updateSplashScreenPage: React.PropTypes.func,
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
			autoplayDisableOnInteraction: false,
		})

		this.mainSwiper = new Swiper('.main-swiper-container', {
			noSwiping: true,
			allowSwipeToPrev: false,
			allowSwipeToNext: false,
			onSlideChangeStart: (instance) => {
				this.props.updateSplashScreenPage(instance.activeIndex)
			}
		})
	},

	slideNext: function() {
		this.mainSwiper.slideNext()
	},

	slidePrev: function() {
		this.mainSwiper.slidePrev()
	},

	render: function() {
		var styles = { swiperContainer: {} }

		if(this.mainSwiper && this.props.splashScreenPage === 2)
			styles = {
				swiperContainer: {
					height: '80%',
				}
			}

		return (
			<div className={ "splash-screen--wrapper " + (this.state.login ? "login" : "") }>
				<div 
					className="swiper-container main-swiper-container"
					style={ styles.swiperContainer }>
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

						<div className="swiper-slide second-slide">
							<div className="login-content">
								<img src="/static/img/MASAS_logo_tipi.svg" className="masas-logo" alt="MASAS-logo" />

								<div className="login-buttons">
									<LoginForm />
									<Button
										noBorders={ true }
										onClick={ this.slidePrev } 
										isSecondaryAction={ true }>
										Cancel
									</Button>
								</div>

								<p onClick={ this.slideNext } className="terms-paragraph">
									By logging-in, you agree to MASAS' Terms of Use & Cookie Policy
								</p>
							</div>
						</div>

						<div className="swiper-slide third-slide">
							<Legals splashScreenLegals={ true } />
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