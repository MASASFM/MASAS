var React = require("react")
// import $ from "jquery"

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Home.jsx")

var { browserHistory } = require('react-router')

var LoginForm = require("../Login/LoginForm.jsx")
var { Button } = require("../UI/UI.jsx")

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
	},

	componentWillUnmount: function () {
		// $("#body--background").removeClass("artist-page-bg musicLover-page-bg dev-page-bg blurred saturated")
		this.props.goToPage(1, 4)
	},

	scrollToInfo: function() {
	},

	render: function() {
		const currentPage = this.props.currentPage
		const pageCount = 4

		// update page backgound (fixed positioning are slow)
		// $("#body--background").removeClass("artist-page-bg musicLover-page-bg dev-page-bg blurred saturated")
		// switch(currentPage) {
		// 	case 1:
		// 		// app background
		// 		break
		// 	case 2:
		// 		$("#body--background").addClass("artist-page-bg")
		// 		break
		// 	case 3:
		// 		$("#body--background").addClass("musicLover-page-bg")
		// 		break
		// 	case 4:
		// 		$("#body--background").addClass("dev-page-bg blurred saturated")
		// 		break
		// 	default:
		// 		break
		// }

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

				<div 
					className="multiPage--wrapper" 
					id="multiPage--wrapper"
					style={{
						overflowY: "hidden",
					}}>

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
						
						<div className="link-button--wrapper">
							<Button className="upload-link-button" onClick={ () => browserHistory.push('/upload') } isBigButton={ true } isSecondaryAction={ true }>Share Your Sounds</Button>
							<Button className="discover-link-button" onClick={ () => browserHistory.push('/discover') } isBigButton={ true } isSecondaryAction={ false }>Discover Music</Button>
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
