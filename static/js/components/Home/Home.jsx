var React = require("react")
var ReactDOM = require("react-dom")
import $ from "jquery"

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Home.jsx")

var { goToURL } = require("../../MASAS_functions.jsx")
var LoginForm = require("../Login/LoginForm.jsx")
var { Button, Link, TimePicker, RankingInfoIcon } = require("../UI/UI.jsx")
var UnsplashControls = require("./UnsplashControls.jsx")

var HomeCountdown = require("./HomeCountdown.jsx")


const FounderInfoBox = (props) => {
	return (
			<div className="founder-info--wrapper">
				<img src={ props.url } alt="founder picture" />
				<div className="text--wrapper">
					<div className="founder-name--wrapper">
						<span className="name1">{ props.name1 }</span>
						<span className="name2">{ props.name2 }</span>
					</div>
					<hr />
					<span className="job">{ props.job }</span>
				</div>
			</div>
		)
}


var Home = React.createClass({
	getInitialState: function() {
		return {
			pageNumber: 1, 		// page number
		}
	},

	componentWillMount: function() {

		this.props.updateTitle('', '0')		// 0 = menu icon; 1 = arrow back
	},

	componentWillUnmount: function () {
		$("#body--background").removeClass("artist-page-bg musicLover-page-bg dev-page-bg blurred saturated")
		this.props.goToPage(1, 4)
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

				<div className="multiPage--wrapper">

					<div className="page" id="homepage-login">
						<UnsplashControls />
						<div className="logo">
							<HomeCountdown user={this.props.user} />
						</div>
						
						<div style={{ visibility: ( this.props.user ? 'hidden' : 'visible') }}>
							<LoginForm 
								fullForm={false} 
								buttonTitle="Request an Invitation" 
								subtitle="via Facebook"/>
						</div>
						
						<Button isBigButton={ true } isSecondaryAction={ true }>Learn more</Button> 
					</div>

					<div className="page" id="masas-info--wrapper">
						<div className="abstract">
							<img src="/static/img/MASAS_icon_metronome.svg" alt="deco" />
							<p>
								Together, with MASAS, we can bring the radio back to its truest form. With no comercials. No biases choice, and accessible by all.
							</p>
						</div>
						<div className="explanation">
							<h1>make a sound and share</h1>

							<h2><span className="bullet">1</span>Discover</h2>
							<div className="time-picker--wrapper" style={{ height: '90px', width: '150px' }}>
								<TimePicker className="time-picker" showHashtag={ false } initialDiscover={ 2 } canvasId="time-picker" wrapperClassName="timePicker--wrapper" />
							</div>
							<p>
								MASAS members are continusly selecting the best trending indie music to gather you the finest tunes. From our joyful <em>#EarlyMorning</em> to our mystic <em>#Night</em> discover them through the time of the day.
							</p>

							<h2><span className="bullet">2</span>Select</h2>
							<div className="RankingInfoIcon--wrapper">
								<RankingInfoIcon ranking={ 0.8 } />
							</div>
							<p>
								Once a sound is upload by the Artist, MASAS members rates them, what we are doing is just to take off the unliked onces and showcase the best rated on <em>Popular</em>.
							</p>

							<h2><span className="bullet">3</span>Experience</h2>
							<p>
								At MASAS we all want to <em>Discover</em> new tasty music. We are building the finest algorithm and designing the best music experience to <em>match your desires with the newest sounds</em>.
							</p>
							<br /><br />
							<p>
								<em>You can be part of the community.</em>
							</p>

							<div className="login-form--wrapper" style={{ visibility: ( this.props.user ? 'hidden' : 'visible') }}>
								<img src="/static/img/MASAS_logo-M.svg" alt="masas-logo" />
								<LoginForm 
									fullForm={false} 
									buttonTitle="Request an Invitation" 
									subtitle="via Facebook"/>
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
