var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Profile.jsx")

var ProfileWrapper = require("./ProfileWrapper.jsx")
var ProfileDumb = require("./ProfileDumb.jsx")

var { getCookie, isObjectEmpty } = require("../../MASAS_functions.jsx")


var Profile = React.createClass({
	propTypes: {
		isEditingProfile: React.PropTypes.bool,
		publicProfileInfo: React.PropTypes.object,
		route: React.PropTypes.object,
		textboxValues: React.PropTypes.object,
		userSCSongs: React.PropTypes.array,
		userData: React.PropTypes.object,
		userToken: React.PropTypes.string,
		routeParams: React.PropTypes.object,
		
		getPublicProfileInfo: React.PropTypes.func,
		toggleEditingProfile: React.PropTypes.func,
		updatePublicProfileInfo: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		updateUserSCSongs: React.PropTypes.func,
		getSCinfo: React.PropTypes.func,
		saveProfile: React.PropTypes.func,
	},

	componentWillMount: function() {
		this.props.updateTitle('My Profile', '0')		// 0 = menu icon; 1 = arrow back

		this.getSCinfo()

		this.getPublicProfileInfo()
	},

	componentWillUnmount: function() {
		if(Object.keys(this.props.publicProfileInfo).length !== 0)
			this.props.updatePublicProfileInfo({})
	},

	// componentWillReceiveProps: function(nextProps, nextState) {
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.route.publicProfile !== this.props.route.publicProfile) {
			if(nextProps.route.publicProfile)
				this.getPublicProfileInfo(nextProps)
			else
				this.props.updatePublicProfileInfo({})
			window.setTimeout(() => this.getSCinfo(), 0)
		}
	},

	getPublicProfileInfo: function(props = null) {
		if(props === null)
			props = this.props

		if(typeof(props.routeParams.username) !== "undefined")
			this.props.getPublicProfileInfo(props.routeParams.username)
		else
			this.props.updateTitle('My Profile', '0')
	},

	getSCinfo: function() {
		this.props.getSCinfo()
	},

	componentDidUpdate: function(prevProps) {
		if(JSON.stringify(this.props.userData.songs) !== JSON.stringify(prevProps.userData.songs))
			this.getSCinfo()
	},

	saveProfile: function() {
		this.props.saveProfile(getCookie)
	},

	render: function() {
		var showProfile = false
		var userData = {}
		var isPublicProfile = typeof(this.props.routeParams.username) !== "undefined"

		if(isPublicProfile) {
			showProfile = !isObjectEmpty(this.props.publicProfileInfo)
			userData = this.props.publicProfileInfo
		} else {
			showProfile = !isObjectEmpty(this.props.userData)
			userData = this.props.userData

			if(this.props.userToken === "")
				showProfile = false
		}

		if(showProfile) {
			return <ProfileDumb 
				userData={ userData }
				isPublicProfile={ isPublicProfile }
				isEditingProfile={ this.props.isEditingProfile }
				userSCSongs={ this.props.userSCSongs }
				toogleEditingProfile={ this.props.toggleEditingProfile }
				saveProfile={ this.saveProfile }/>
		} else {
			return (
				<div style={{display: 'flex', flex: 1}}>
					<ProfileWrapper/>
				</div>
			)
		}
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)
