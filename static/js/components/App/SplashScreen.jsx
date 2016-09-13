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
			autoplay: 6000,
			autoplayDisableOnInteraction: false,
			onSlideChangeStart: (instance) => {
				const urls = {
					0: ["https://hd.unsplash.com/photo-1449168013943-3a15804bb41c"],
					1: ["https://hd.unsplash.com/photo-1460500063983-994d4c27756c"],
					2: ["https://hd.unsplash.com/38/L2NfDz5SOm7Gbf755qpw_DSCF0490.jpg"],
					3: ["https://hd.unsplash.com/photo-1464022793855-9b1e5bd1d8d4"],
					4: ["https://hd.unsplash.com/photo-1457256439474-fbd0369264a1"],
					5: ["https://hd.unsplash.com/photo-1444080748397-f442aa95c3e5"],
				}

				const changeBackground = (hashtag) => {
					$('.splash-screen--wrapper').css('background-image', 'url(' + urls[hashtag][0] + ')')
				}

				switch(instance.activeIndex) {
					case 0:
						changeBackground(0)
						break
					case 1:
						changeBackground(1)						
						break
					case 2:
						changeBackground(2)
						break
					case 3:
						changeBackground(3)
						break
					case 4:
						changeBackground(4)
						break
					case 5:
						changeBackground(5)
						break
				}
			}
		})

		this.mainSwiper = new Swiper('.main-swiper-container', {
			noSwiping: true,
			allowSwipeToPrev: false,
			allowSwipeToNext: false,
			onSlideChangeStart: (instance) => {
				this.props.updateSplashScreenPage(instance.activeIndex)

				if(instance.activeIndex !== 0)
					this.hashtagSwiper.stopAutoplay()
				else
					this.hashtagSwiper.startAutoplay()
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
			<div className={ "splash-screen--wrapper " + (this.props.splashScreenPage === 1 ? "login" : "") + (this.props.splashScreenPage === 2 ? "legals" : "") }>
				<div 
					className={ "swiper-container main-swiper-container " + (this.props.splashScreenPage === 2 ? "legals-height" : "") } >
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
							<Legals
								backButtonFunc={ this.slidePrev }
								splashScreenLegals={ true } />
							<Button
								isBigButton={ false }
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