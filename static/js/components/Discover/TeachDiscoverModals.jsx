var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TeachDiscoverModals.jsx")

var { getCookie, updateProfileInfo } = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")

var TeachDiscoverModals = {}

TeachDiscoverModals.TeachDiscoverModal1 = ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(React.createClass({
		propTypes: {
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
				success: (r) => {
					updateProfileInfo(this.props.toogleIsModalOpened)
					console.log(r)
				},
				error: (e) => console.log(e),
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
						onClick={ this.updateUserStep }>Yeah!</Button>

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
				success: (r) => {
					updateProfileInfo(this.props.toogleIsModalOpened)
					console.log(r)
				},
				error: (e) => console.log(e),
			})
		},

		render: function() {
			return (
				<div className="teach-modal--wrapper">
					BAR
					<Button 
						isBigButton={false}
						onClick={ this.updateUserStep }>Got it!</Button>
				</div>
			)
		}
	})
)

module.exports = TeachDiscoverModals