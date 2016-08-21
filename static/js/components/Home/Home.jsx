var React = require("react")
var ReactDOM = require("react-dom")
import $ from "jquery"

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Home.jsx")

var { goToURL } = require("../../MASAS_functions.jsx")
var LoginForm = require("../Login/LoginForm.jsx")
var { Button, Link } = require("../UI/UI.jsx")
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

	// <div className="login-container" style={{ display: (this.props.user ? 'none' : 'flex') }}>
	// 						<LoginForm fullForm={false} buttonTitle="Request an Invitation" />
	// 						<div>via Facebook</div>
	// 					</div>

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

					<div className={ "page " + (currentPage === 1 ? "1" : "2") + "--wrapper" } id="homepage-login">
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

					<div className={ "page " + (currentPage === 1 ? "1" : "2") + "--wrapper" } id="homepage-login">
						<div className="logo">
							<HomeCountdown user={this.props.user} />
						</div>
						
						<div style={{ visibility: ( this.props.user ? 'hidden' : 'visible') }}>
							<LoginForm 
								fullForm={false} 
								buttonTitle="Request an Invitation" 
								subtitle="via Facebook"/>
						</div>
					</div>

					<div className={ "page " + (currentPage === 1 ? "1" : "2") + "--wrapper" } id="homepage-login">
						<div className="logo">
							<HomeCountdown user={this.props.user} />
						</div>
						
						<div style={{ visibility: ( this.props.user ? 'hidden' : 'visible') }}>
							<LoginForm 
								fullForm={false} 
								buttonTitle="Request an Invitation" 
								subtitle="via Facebook"/>
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
