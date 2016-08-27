// STATEFUL COMPONENT => CHANGE !!!! (integrate w/ redux states)

var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Profile.jsx")

var Sidebar = require("react-sidebar")
var ProfileWrapper = require("./ProfileWrapper.jsx")
var NavSidebar = require("../NavSidebar/NavSidebar.jsx")
var Header = require("../Header/Header.jsx")
var Footer = require("../Footer/Footer.jsx")
var TrackItem = require("../Profile/TrackItem.jsx")
var ProfileEditLinks = require("./ProfileEditLinks.jsx")
var ProfileEdit = require("./ProfileEdit.jsx")

var { goToURL, getCookie, updateNotificationBar, updateProfileInfo, isObjectEmpty } = require("../../MASAS_functions.jsx")
var { Button, Body, Textbox, Marquee } = require("../UI/UI.jsx")


var Profile = React.createClass({
	propTypes: {
		isEditingProfile: React.PropTypes.bool,
		toggleEditingProfile: React.PropTypes.func,
		textboxValues: React.PropTypes.object,
		updatePublicProfileInfo: React.PropTypes.func,
		publicProfileInfo: React.PropTypes.object,
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
			$.ajax({
				type: 'GET',
				url: "/api/users/" + props.routeParams.username + "/",
				success: (r) => {
					props.updatePublicProfileInfo(r)
					
					// forcing get soundcloud info after updating public profile
					setTimeout(() => {
						if(this.props.publicProfileInfo.name)
							this.props.updateTitle(this.props.publicProfileInfo.name + "'s profile", '0')
						else
							this.props.updateTitle(this.props.publicProfileInfo.username + "'s profile", '0')
						this.getSCinfo()
					}, 0)
				},
				error: (e) => {
					console.log(e)
				}
			})
		else
			this.props.updateTitle('My Profile', '0')
	},

	componentWillUnmount: function() {
		if(Object.keys(this.props.publicProfileInfo).length !== 0)
			this.props.updatePublicProfileInfo({})
	},

	// componentWillReceiveProps: function(nextProps, nextState) {
	componentWillReceiveProps: function(nextProps, nextState) {
		if(nextProps.route.publicProfile !== this.props.route.publicProfile) {
			if(nextProps.route.publicProfile)
				this.getPublicProfileInfo(nextProps)
			else
				this.props.updatePublicProfileInfo({})
			window.setTimeout(() => this.getSCinfo(), 0)
		}
	},

	getSCinfo: function() {
		var songs = {}

		if(isObjectEmpty(this.props.publicProfileInfo))
			songs = this.props.userData.songs
		else
			songs = this.props.publicProfileInfo.songs

		if(typeof(songs) !== "undefined") {
			var idString = songs.map((song) => {return song.SC_ID}).join()

			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				this.setState({ userSCSongs: response })
			})
		}
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(JSON.stringify(this.props.userData.songs) !== JSON.stringify(prevProps.userData.songs))
			this.getSCinfo()
	},

	displaySongs: function() {
		var songs = {}

		if(isObjectEmpty(this.props.publicProfileInfo))
			songs = this.props.userData.songs
		else
			songs = this.props.publicProfileInfo.songs

		if (!songs.length) 
			return (
				isObjectEmpty(this.props.publicProfileInfo) ?
					<div className="no-songs--wrapper">
						 {/*
						 <div className="image--wrapper">
							<img src="/static/img/MASAS_logo_soundcloud.svg" className="SC-logo" alt="soundcloud sync" />
							<img src="/static/img/MASAS_icon_synch_separator.svg" className="sync-icon" alt="soundcloud sync" />
							<img src="/static/img/MASAS_logo-M.svg" className="MASAS-logo" alt="soundcloud sync" />
						</div>
						*/}
						<div className="upload-button">
							<Button onClick={goToURL.bind(null, "/upload")}>Upload my first sound</Button>
						</div>
					</div>
					:
					<div className="no-songs--wrapper">
						<div className="upload-button">
							<Button onClick={goToURL.bind(null, "/upload")} isSecondaryAction={ true } isDisabled={ true }>This user has no sounds</Button>
						</div>
					</div>
				)
		else {
			var songs = {}

			if(isObjectEmpty(this.props.publicProfileInfo))
				songs = this.props.userData.songs
			else
				songs = this.props.publicProfileInfo.songs

			var compareFn = (a, b) => {
				var dateA = new Date(a.dateUploaded)
				var dateB = new Date(b.dateUploaded)

				if (dateA > dateB) {
					return -1
				}
				if (dateB > dateA) {
					return 1
				}
					return 0
			}
			songs.sort(compareFn)

			var songList =  songs.map((song) => { 
				var SC_songInfo = this.state.userSCSongs.filter((el) => {
					return el.id === song.SC_ID
				})[0]

				// return nothing if song no longer exists on soundcloud
				if(SC_songInfo === undefined)
					return

				return <TrackItem key={song.SC_ID} track={ SC_songInfo } MASAS_songInfo={song} allowOpen={ !this.props.route.publicProfile }/>
			})

			return (
				<div>
					<div className="track-table--wrapper">
						{songList}
					</div>
				</div>
				)
		}
	},

	saveProfile: function() {
		const header = "Bearer " + this.props.userToken
		var csrftoken = getCookie("csrftoken")

		var textboxValues = { ...this.props.textboxValues }
		var links = textboxValues.link_set
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
			success: (r) => {
				counterSuccess = counterSuccess + 1

				if(counterSuccess === counterTotal) {
					updateProfileInfo()
					updateNotificationBar('Profile updated !')
					this.props.toggleEditingProfile()
				}
				
			},
			error: (e) => {
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
					success: (r) => {
						counterSuccess = counterSuccess + 1

						if(counterSuccess === counterTotal) {
							updateProfileInfo()
							updateNotificationBar('Profile updated !')
							this.props.toggleEditingProfile()
						}
					},
					error: (e) => {
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
					success: (r) => {
						counterSuccess = counterSuccess + 1

						if(counterSuccess === counterTotal) {
							updateProfileInfo()
							updateNotificationBar('Profile updated !')
							this.props.toggleEditingProfile()
						}
					},
					error: (e) => {
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

		if(isObjectEmpty(this.props.publicProfileInfo)) {
			showProfile = !isObjectEmpty(this.props.userData)
			link_set = this.props.userData.link_set
			avatar_url = this.props.userData.avatar_url
			name = this.props.userData.name
			username = this.props.userData.username
			city = this.props.userData.city
			occupation = this.props.userData.occupation
		} else {
			showProfile = !isObjectEmpty(this.props.publicProfileInfo)
			link_set = this.props.publicProfileInfo.link_set
			avatar_url = this.props.publicProfileInfo.avatar_url
			name = this.props.publicProfileInfo.name
			username = this.props.publicProfileInfo.username
			city = this.props.publicProfileInfo.city
			occupation = this.props.publicProfileInfo.occupation
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
							<div className="profile-info--wrapper">
								{ this.props.route.publicProfile ?
									<div></div>
									:
									<div className="edit-profile-icon--wrapper">
										{ this.props.isEditingProfile ?
												<div><span onClick={ this.cancelEdit } style={{ paddingRight: "0.5rem" }}>cancel</span><span onClick={ this.saveProfile }>save</span></div>
											:
												<img onClick={ this.props.toggleEditingProfile } className="abcdefg" src="/static/img/edit_pencil.svg" alt="edit profile" />
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
														<a href={ this.checkLink("soundcloud.com") } target="_blank">
															<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
														</a> : ""
	 											}
	 											{
													this.checkPersonalWebsite() !== "" ?
														<a href={ this.checkPersonalWebsite() } target="_blank">
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
														<a href={ this.checkLink("twitter.com") } target="_blank">
															<img src="/static/img/twitter.svg" alt="twitter" />
														</a> : ""
	 											}
	 											{
													this.checkLink("facebook.com") !== "" ?
														<a href={ this.checkLink("facebook.com") } target="_blank">
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
							{ this.displaySongs() }
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

var styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)