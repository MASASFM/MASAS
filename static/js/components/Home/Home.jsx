var React = require("react")
import $ from "jquery"

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Home.jsx")

var { goToURL } = require("../../MASAS_functions.jsx")
var LoginForm = require("../Login/LoginForm.jsx")
var { Button, TimePicker, RankingInfoIcon } = require("../UI/UI.jsx")
// var UnsplashControls = require("./UnsplashControls.jsx")

var HomeCountdown = require("./HomeCountdown.jsx")

var Home = React.createClass({
	propTypes: {
		updateTimePickerNumber: React.PropTypes.func,
		goToPage: React.PropTypes.func,
		goToLogin: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		demoTimePickerNumber: React.PropTypes.number,
		currentPage: React.PropTypes.number,
		user: React.PropTypes.string,
	},

	getInitialState: function() {
		return {
			pageNumber: 1, 		// page number
			value: 0
		}
	},

	componentWillMount: function() {

		this.props.updateTitle('Home', '0')		// 0 = menu icon; 1 = arrow back
	},

	componentDidMount: function() {
		const marginBottom = $(window).height()/2 - document.getElementsByClassName('login-form--wrapper')[0].scrollHeight/2

		const loginForm = document.getElementsByClassName('login-form--wrapper')[0]

		loginForm.style.marginBottom = marginBottom + "px"

		$('#multiPage--wrapper').scroll( () => {
			const topBound = $(window).height() - 120
			const bottomBound = 50
			if($('#time-picker-home').offset().top <  topBound && $('#time-picker-home').offset().top > bottomBound) {
				this.setState({ value: (topBound - $('#time-picker-home').offset().top) / topBound * 100 })
			} else if($('#time-picker-home').offset().top > topBound)  {
				this.setState({ value: 0 })
			} else {
				this.setState({ value: 100 })
			}
		})
	},

	componentWillUnmount: function () {
		$("#body--background").removeClass("artist-page-bg musicLover-page-bg dev-page-bg blurred saturated")
		this.props.goToPage(1, 4)

		$('#multiPage--wrapper').unbind("scroll")
	},

	scrollToInfo: function() {
		$("#multiPage--wrapper").animate({ scrollTop: $("#homepage-login").height() }, '500')
	},

	render: function() {
		const currentPage = this.props.currentPage
		const pageCount = 4

		// update page backgound (fixed positioning are slow)
		$("#body--background").removeClass("artist-page-bg musicLover-page-bg dev-page-bg blurred saturated")
		switch(currentPage) {
			case 1:
				// app background
				break
			case 2:
				$("#body--background").addClass("artist-page-bg")
				break
			case 3:
				$("#body--background").addClass("musicLover-page-bg")
				break
			case 4:
				$("#body--background").addClass("dev-page-bg blurred saturated")
				break
			default:
				break
		}

		return (
			<div className="home--wrapper">

				{ 
					currentPage !== 1 ? 
						<div className="page-up--wrapper">
							<img onClick={this.props.goToPage.bind(null, currentPage - 1, pageCount)} src="/static/img/MASAS_arrow_down.svg" alt="down arrow" className="page-up-icon"/>
						</div>
					:
						""
				}

				<div className="multiPage--wrapper" id="multiPage--wrapper">

					<div className="page" id="homepage-login">
						{ /* <UnsplashControls /> */ }
						<div className="logo">
							<HomeCountdown user={this.props.user} />
						</div>
						
						<div style={{ visibility: ( this.props.user ? 'hidden' : 'visible') }}>
							<LoginForm 
								fullForm={false} 
								buttonTitle="Request an Invitation" 
								subtitle="via Facebook"/>
						</div>
						
						<Button onClick={ this.scrollToInfo } isBigButton={ true } isSecondaryAction={ true }>Learn the basic</Button> 
					</div>

					<div className="page" id="masas-info--wrapper">
						<div className="abstract">
							<img src="/static/img/MASAS_icon_metronome.svg" alt="deco" />
							<p>
								Get Discovered as an Artist, Discover new tunes as a Music Lover.  Do it all for Free!
							</p>
						</div>
						<div className="explanation">
							<h1>make a sound and share</h1>

							<h2><span className="bullet">1</span>Moods</h2>
							<div className="time-picker--wrapper" style={{ height: '90px', width: '150px' }}>
								<TimePicker 
									className="time-picker" 
									currentDiscover={ this.props.demoTimePickerNumer }
									showHashtag={ true }
									initialDiscover={ 2 } 
									canvasId="time-picker-home" 
									sliderValue={ this.state.value }
									wrapperClassName="timePicker--wrapper" />
							</div>
							<p>
								Listen to music that fits your mood by dragging the sun around
							</p>

							<h2><span className="bullet">2</span>Discover</h2>
								<img 
									src="/static/img/MASAS_liked.svg" 
									alt="likes_icon" 
									style={{ width: '4rem', marginBottom: '2rem' }}/>
							<p>
								Discover and save your next favorite tunes, at any time, by hitting the diamond.
							</p>

							<h2><span className="bullet">3</span>Popular</h2>
							<div className="RankingInfoIcon--wrapper">
								<RankingInfoIcon ranking={ 0.8 } />
							</div>
							<p>
								All of your music is great, but only the most loved ones will get to play on <em>Popular</em>. For each of our six moods.
							</p>
							<br /><br />
							<p>
								<em>Be part of the evolution be part of the family, by simply sharing.</em>
							</p>

							<div 
								className="login-form--wrapper" 
								style={{ display: ( this.props.user ? 'none' : 'flex'),fontSize: '1rem', letterSpacing: '0.13rem' }}>
								<img src="/static/img/MASAS_logo-M.svg" alt="masas-logo" />
								<Button 
									onClick={ () => goToURL('login') }>Request an invitation</Button>
							</div>
							<div style={{ display: ( this.props.user ? 'flex' : 'none'), height: '15rem' }}>
							</div>
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
)(Home)
