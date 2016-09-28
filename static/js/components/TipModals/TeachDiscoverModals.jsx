var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TeachDiscoverModals.jsx")

var { updateProfileInfo } = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")

var TeachDiscoverModals = {}

TeachDiscoverModals.TeachDiscoverModal1 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
			MASASuser: React.PropTypes.string,
			userData: React.PropTypes.object,

			toogleIsModalOpened: React.PropTypes.func,
		},

		componentWillMount: function() {
		},

		updateUserStep: function() {
			var header = "Bearer " + this.props.MASASuser

			$.ajax({
				type: 'POST',
				url: '/api/usersteps/',
				headers: {
					"Authorization": header,
				},
				data: {
					user: this.props.userData.url,
					step: 5,
				},
				success: () => {
					updateProfileInfo(this.props.toogleIsModalOpened)
				},
				error: () => {},
			})
		},

		render: function() {
			return (
				<div className="teach-modal--wrapper">
					<p className="bold">
						Hey, Meet the Discovery Slider
					</p>
					<p>
						It's your new friend! Match your daily journey with 6 different moods
					</p>
					<Button 
						isBigButton={false}
						onClick={ this.updateUserStep }>Next tip</Button>

				</div>
			)
		}
	})
)


TeachDiscoverModals.TeachDiscoverModal2 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
			MASASuser: React.PropTypes.string,
			userData: React.PropTypes.object,

			toogleIsModalOpened: React.PropTypes.func,
		},

		componentWillMount: function() {
		},

		updateUserStep: function() {
			var header = "Bearer " + this.props.MASASuser

			$.ajax({
				type: 'POST',
				url: '/api/usersteps/',
				headers: {
					"Authorization": header,
				},
				data: {
					user: this.props.userData.url,
					step: 6,
				},
				success: () => {
					updateProfileInfo(this.props.toogleIsModalOpened)
				},
				error: () => {},
			})
		},

		render: function() {
			return (
				<div className="teach-modal--wrapper like-UI-info">
					<p className="paragraph1">
						The songs most loved by the community will get played on <strong>Popular</strong>
					</p>
					<p>
						<img src="/static/img/MASAS_like_shadow.svg" alt="like-icon" />
						<span>
							Click the diamond to <strong>Like</strong> a song!
						</span>
					</p>
				</div>
			)
		}
	})
)

module.exports = TeachDiscoverModals
