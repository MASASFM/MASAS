var React = require("react")
var ReactDOM = require("react-dom")
import $ from "jquery"

var {goToURL} = require("../../../MASAS_functions.jsx")

var Button = require("../../containers/UI/Button.jsx")
var Link = require("../../containers/UI/Link.jsx")
var TimePicker = require("../UploadSC/TimePicker.jsx")

var HomeCountdown = require("./HomeCountdown.jsx")


const FounderInfoBox = (props) => {
	return (
			<div className="founder-info--wrapper">
				<img src={ props.url } alt="founder picture" />
				<div className="text--wrapper">
					<span className="name">{ props.name }</span>
					<hr />
					<span className="job">{ props.job }</span>
				</div>
			</div>
		)
}


var Home = React.createClass({
	getInitialState: function() {
		return {
			pageNumber: 1, 		// page numebr
		}
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

					<div className={ "page" + (currentPage === 1 ? "1" : "2") + "--wrapper" } id="homepage-login">
						<div className="logo">
							<HomeCountdown user={this.props.user} />
						</div>
						<div className="login-container" style={{display: 'none'}}>
							<Button onClick={goToURL.bind(null, 'login')} caps={true}>log-in</Button>
							<br />
							<Link to="/sign-up" className="signup-text">Sign up</Link>
						</div>
						<img onClick={this.props.goToPage.bind(null, 2, pageCount)} src="/static/img/puff_loader_slow.svg" alt="down arrow" className="arrow-icon"/>
					</div>

					<div className={ "page" + (currentPage === 2 ? "1" : "2") + "--wrapper" } id="homepage-description--artist">
						<div className="text--wrapper">
							<img src="/static/img/homepage/artist_deco1.png" alt="website screenshot" />
							<h1 onClick={this.goToPage1}>i'm an artist</h1>
							<p>
								Music transcends the boundaries of language and culture, it is a beautiful outburst of the soul that brings joy and happiness; and this is exactly why you should share yours. Plus, you know, music lovers from all over the world will listen to you music.
							</p>
							<div className="button" style={{width: '70%'}}>
								{ this.props.user ?
									<Button white={true} onClick={goToURL.bind('null', '/sc-sync')}>Start Uploading</Button>
								:
									<Button onClick={goToURL.bind('null', '/login')}>Get Early Access</Button>
								}
							</div>
						</div>
					</div>

					<div className={ "page" + (currentPage === 3 ? "1" : "2") + "--wrapper" } id="homepage-description--musicLover">
						<div className="text--wrapper">
							<img src="/static/img/homepage/musicLover_deco1.png" alt="website screenshot" />
							<h1 onClick={this.goToPage1}>i'm a music lover</h1>
							<p>
								Music has a universal capacity to positively influence our moods in the midst of our daily routine. Music is incredible, but it is even better when we share it together. On MASAS, everyone collaborates together to Discover new tunes and create a better Radio.
							</p>
							<div className="button">
								{ this.props.user ?
									<Button onClick={goToURL.bind('null', '/profile')}>My Profile</Button>
								:
									<Button onClick={goToURL.bind('null', '/login')}>Get Early Access</Button>
								}
							</div>
						</div>
					</div>

					<div className={ "page" + (currentPage === 4 ? "1" : "2") + "--wrapper" } id="homepage-description--developpers">
						<h1>founders</h1>
						<div className="founders-info--wrapper">
							<FounderInfoBox
								url="/static/img/founders.png"
								name="Victor Binétruy-Pic"
								job="Front-end Developper" />
							<FounderInfoBox
								url="/static/img/founders.png"
								name="Thomas Binétruy-Pic"
								job="Front-end Developper" />
							<FounderInfoBox
								url="/static/img/founders.png"
								name="Micka Touillaud"
								job="Product Designer " />
							<FounderInfoBox
								url="/static/img/founders.png"
								name="James Pic"
								job="Back-end Engineer" />
						</div>
						<div className="description">
							With MASAS, we hope to nurture the true essence of an ever-expanding grassroots movement. Be part of the evolution by simply… sharing.
						</div>
						<div className="social-buttons">
							<div className="facebook">
								Invite a friend
							</div>
							<div className="twitter">
								Invite a friend
							</div>
						</div>	
					</div>

				</div>
						<div className="page-down--wrapper" style={{ display: currentPage !== pageCount && currentPage !== 1 ? 'flex' : 'none' }}>
							<img onClick={this.props.goToPage.bind(null, currentPage + 1, pageCount)} src="/static/img/MASAS_arrow_down.svg" alt="down icon" className="page-down-icon"/>
						</div>
			</div>
		)
	}
})

module.exports = Home