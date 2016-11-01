// STATEFUL COMPONENT => CHANGE !!!! (integrate w/ redux states)

var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Profile.jsx")

var ProfileWrapper = require("./ProfileWrapper.jsx")
var TrackItem = require("../Profile/TrackItem.jsx")
var ProfileEditLinks = require("./ProfileEditLinks.jsx")
var ProfileEdit = require("./ProfileEdit.jsx")
var ProfileTrackList = require("./ProfileTrackList.jsx")

var { goToURL, getCookie, updateNotificationBar, updateProfileInfo, isObjectEmpty } = require("../../MASAS_functions.jsx")
var { Button, Marquee } = require("../UI/UI.jsx")



var Profile = React.createClass({
	propTypes: {
		isEditingProfile: React.PropTypes.bool,
		publicProfileInfo: React.PropTypes.object,
		route: React.PropTypes.object,
		textboxValues: React.PropTypes.object,
		userSCSongs: React.PropTypes.array,
		userData: React.PropTypes.object,
		userToken: React.PropTypes.string,
		
		getPublicProfileInfo: React.PropTypes.func,
		toggleEditingProfile: React.PropTypes.func,
		updatePublicProfileInfo: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		updateUserSCSongs: React.PropTypes.func,
		getSCinfo: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			userSCSongs: [],			// song info from SC using songs from user entry
		}
	},

	componentWillMount: function() {
		this.props.updateTitle('My Profile', '0')		// 0 = menu icon; 1 = arrow back

		this.getSCinfo()

		this.getPublicProfileInfo()
	},

	getPublicProfileInfo: function(props = null) {
		if(props === null)
			props = this.props

		if(typeof(props.routeParams.username) !== "undefined")
			this.props.getPublicProfileInfo(props.routeParams.username)
		else
			this.props.updateTitle('My Profile', '0')
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

	getSCinfo: function() {
		this.props.getSCinfo()
	},

	componentDidUpdate: function(prevProps) {
		if(JSON.stringify(this.props.userData.songs) !== JSON.stringify(prevProps.userData.songs))
			this.getSCinfo()
	},

	saveProfile: function() {
		const header = "Bearer " + this.props.userToken
		var csrftoken = getCookie("csrftoken")

		var textboxValues = { ...this.props.textboxValues }
		delete textboxValues.link_set
		textboxValues.city = textboxValues.city

		// counter used to know how many ajax calls are made
		var counterTotal = 1
		var counterSuccess = 0

		// UPDATE PROFILE PART I (everything but links)
		$.ajax({
			type: "PATCH",
			url: this.props.userData.url,
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			},
			contentType: "application/json",
			data: JSON.stringify(textboxValues), 
			success: () => {
				counterSuccess = counterSuccess + 1

				if(counterSuccess === counterTotal) {
					updateProfileInfo()
					updateNotificationBar('Profile updated !')
					this.props.toggleEditingProfile()
				}
				
			},
			error: () => {
				updateNotificationBar("Error updating profile...")
			}
		})

		// UPDATE PROFILE LINKS

		// link user entered doesn't exist, we create it
		this.props.textboxValues.link_set.map((textboxLink) => {
			var match = this.props.userData.link_set.filter((userLink) => {
				return textboxLink === userLink.link
			})

			// new link => POST
			if(match.length === 0 && textboxLink !== "") {
				counterTotal = counterTotal + 1

				$.ajax({
					type: "POST",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken
					},
					url: "/api/links/",
					contentType: "application/json",
					data: JSON.stringify({
						link: textboxLink,
						user: this.props.userData.url
					}),
					success: () => {
						counterSuccess = counterSuccess + 1

						if(counterSuccess === counterTotal) {
							updateProfileInfo()
							updateNotificationBar('Profile updated !')
							this.props.toggleEditingProfile()
						}
					},
					error: () => {
						updateNotificationBar("Error updating profile...")
					}
				})
			}
		})

		// link user has in DB isn't in textboxes user has entered, we delete link in DB
		this.props.userData.link_set.map((userLink) => {
			var match = this.props.textboxValues.link_set.filter((textboxLink) => {
				return userLink.link === textboxLink
			})

			// new link => DELETE
			if(match.length === 0) {
				counterTotal = counterTotal + 1

				$.ajax({
					type: "DELETE",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken
					},
					url: userLink.url,
					success: () => {
						counterSuccess = counterSuccess + 1

						if(counterSuccess === counterTotal) {
							updateProfileInfo()
							updateNotificationBar('Profile updated !')
							this.props.toggleEditingProfile()
						}
					},
					error: () => {
						updateNotificationBar("Error updating profile...")
					}
				})
			}
		})

	},

	cancelEdit: function() {
		this.props.toggleEditingProfile()	
	},

	checkLink: function(url) {
		var link_set = []

		if(isObjectEmpty(this.props.publicProfileInfo))
			link_set = this.props.userData.link_set
		else
			link_set = this.props.publicProfileInfo.link_set

		var checkVar = link_set.filter(({ link }) => {
			return link.includes(url)
		})

		if(checkVar.length)
			return checkVar[0].link
		else
			return ""
	},

	checkPersonalWebsite: function() {
		var link_set = []

		if(isObjectEmpty(this.props.publicProfileInfo))
			link_set = this.props.userData.link_set
		else
			link_set = this.props.publicProfileInfo.link_set

		var checkVar = link_set.filter(({ link }) => {
			return !link.includes("facebook.com") && !link.includes("twitter.com") && !link.includes("soundcloud.com")
		})

		if(checkVar.length)
			return checkVar[0].link
		else
			return ""
	},

	render: function() {
		var link_set = []
		var showProfile = false
		var avatar_url = ""
		var name = ""
		var username = ""
		var city = ""
		var occupation = ""
		var songs = []
		//////////////
		var userData = {}
		var isPublicProfile = false
		var songs = this.props.userData.songs

		if(isObjectEmpty(this.props.publicProfileInfo)) {
			showProfile = !isObjectEmpty(this.props.userData)
			link_set = this.props.userData.link_set
			avatar_url = this.props.userData.avatar_url
			name = this.props.userData.name
			username = this.props.userData.username
			city = this.props.userData.city
			occupation = this.props.userData.occupation
			songs = this.props.userData.songs
			userData = this.props.userData

			if(this.props.userToken === "")
				showProfile = false
		} else {
			showProfile = !isObjectEmpty(this.props.publicProfileInfo)
			link_set = this.props.publicProfileInfo.link_set
			avatar_url = this.props.publicProfileInfo.avatar_url
			name = this.props.publicProfileInfo.name
			username = this.props.publicProfileInfo.username
			city = this.props.publicProfileInfo.city
			occupation = this.props.publicProfileInfo.occupation
			songs = this.props.publicProfileInfo.songs
			userData = this.props.publicProfileInfo
			isPublicProfile = true
			songs = this.props.publicProfileInfo.songs
		}

		var isProfileEmpty = false

		if(showProfile)
			if(link_set.length === 0 && (city === null || city === "") && (occupation === null || occupation === ""))
				isProfileEmpty = true

		if(showProfile) {
			return (
				<div style={{display: 'flex', flex: 1}}>
					<ProfileWrapper>
						<div className="main--wrapper">
							<div className={ "profile-info--wrapper " + ( !songs.length ?  "no-songs" : "") }>
								{ this.props.route.publicProfile ?
									<div></div>
									:
									<div className="edit-profile-icon--wrapper">
										{ this.props.isEditingProfile ?
												<div><span onClick={ this.cancelEdit } style={{ paddingRight: "0.5rem" }}>cancel</span><span onClick={ this.saveProfile }>save</span></div>
											:
												<img onClick={ this.props.toggleEditingProfile } className="abcdefg" src="/static/img/MASAS_edit_profile.svg" alt="edit profile" />
										}
									</div>
								}
								{ avatar_url ?
									<img src={ avatar_url + "?width=400" } alt="profile picture" className="profile-picture" />
									:
									<div className="profile-picture" ></div>
								}
								<div className="tab--wrapper">
									<div className="tab" style={{ borderBottom: '4px solid white'}}>
										info
									</div>
									<div className="tab">
										post
									</div>
								</div>
								<div className={ "text--wrapper " + (this.props.isEditingProfile ? "is-editing-profile" : "") }>
									<div className="text--wrapper2" style={{ display: "flex", flexDirection: "column" }}>
										<div className={ "user-info-desktop " + (this.props.isEditingProfile ? "hidden" : "") } >
											<span className="username">
												{
													name ? 
														<Marquee>{ name }</Marquee>
													:
														<Marquee>{ username }</Marquee>
												}
											</span>
											<div className="occupation--wrapper">
												<span className="location">
													{ 
														city ?
															<Marquee>{ city.display_name.replace( /,.*?,/, ',' ) }</Marquee>
														:
															""
													}
												</span>
												<span className="occupation">
													{ 
														occupation ?
															<Marquee>{ occupation }</Marquee>
														:
															""
													}
												</span>
											</div>
										</div>
										<div className={ "social--wrapper " + (this.props.isEditingProfile ? "hidden" : "") } style={ isProfileEmpty ? { display: "none" } : {} }>
											<div className="social-links right">
												{
													this.checkLink("soundcloud.com") !== "" ?
														<a href={ this.checkLink("soundcloud.com") } className="site-logo" target="_blank">
															<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
														</a> : ""
												}
												{
													this.checkPersonalWebsite() !== "" ?
														<a href={ this.checkPersonalWebsite() } className="site-logo" target="_blank">
															<img src="/static/img/MASAS_logo_world.svg" alt="personal page" />
														</a> : ""
												}
											</div>
											<div className="occupation--wrapper">
												<div className="occupation">
													{ 
														occupation ?
															<Marquee>{ occupation }</Marquee>
														:
															""
													}
												</div>
												<div className="location">
													<span className="city">
														{ 
															city ?
																<Marquee>{ city.display_name.substring(0, city.display_name.indexOf(',')) + " - " + city.display_name.substring(city.display_name.lastIndexOf(',') + 1, city.display_name.length) }</Marquee>
															:
																""
														}
													</span>
											
												</div>
											</div>
											<div className="social-links left">
												{
													this.checkLink("twitter.com") !== "" ?
														<a href={ this.checkLink("twitter.com") } className="site-logo" target="_blank">
															<img src="/static/img/twitter.svg" alt="twitter" />
														</a> : ""
												}
												{
													this.checkLink("facebook.com") !== "" ?
														<a href={ this.checkLink("facebook.com") } className="site-logo" target="_blank">
															<img src="/static/img/facebook.svg" alt="facebook" />
														</a> : ""
												}
											</div>
										</div>
									</div>
									<div className="edit-profile--wrapper" style={{ display: (this.props.isEditingProfile ? "flex" : "none") }}>
										{ this.props.isEditingProfile ? 
											<ProfileEdit show={ !this.props.route.publicProfile } />
											:
											""
										}
									</div>
								</div>
							</div>
							<div className="social-stats--wrapper">
								<div className="section" style={{borderRight: '1px solid white'}}>
									<div className="section-title">
										<img src="/static/img/MASAS_followers.svg" alt="soundcloud" />
										Followers
									</div>
									<span className="number">1240</span>
								</div>
								<div className="section total-plays" style={{borderRight: '1px solid white'}}>
									<div className="section-title">
										<img src="/static/img/MASAS_logo_tunes.svg" alt="total plays" />
										Total plays
									</div>
									<span className="number">1240</span>
								</div>
								<div className="section">
									<div className="section-title">
										<img src="/static/img/MASAS_logo_tunes.svg" alt="soundcloud" />
										Following
									</div>
									<span className="number">1240</span>
								</div>
							</div>
						</div>
						<div className="song-list--wrapper">
							<div className={ "edit-social-mobile--wrapper " + (!this.props.isEditingProfile ? "hidden" : "")}>
								<ProfileEditLinks show={ !this.props.route.publicProfile } />
							</div>
							<ProfileTrackList 
								songs={ songs }
								isPublicProfile={ isPublicProfile }
								userSCSongs={ this.props.userSCSongs }
								userData={ userData } />
						</div>

					</ProfileWrapper>
				</div>
			)
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
