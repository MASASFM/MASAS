var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/UploadSC.jsx")

var { Button, Body, TimePicker } = require("../UI/UI.jsx")
var UploadSCItem = require("./UploadSCItem.jsx")
var PickTimeUpload = require("./PickTimeUpload.jsx")
var SplashScreen = require("../App/SplashScreen.jsx")


var UploadSC = React.createClass({
	propTypes: {
		isConnectedSoundcloud: React.PropTypes.bool,
		choosingTime: React.PropTypes.object,
		isModalOpened: React.PropTypes.bool,
		userData: React.PropTypes.object,
		userPk: React.PropTypes.string,
		masasUserTracks: React.PropTypes.array,
		modalType: React.PropTypes.number,
		SCusername: React.PropTypes.string,
		soundcloudUserTracks: React.PropTypes.array,
		MASASuser: React.PropTypes.string,

		updateTitle: React.PropTypes.func,
		updateModalType: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateMasasUserTracks: React.PropTypes.func,
		updateSCusername: React.PropTypes.func,
		getUserSCTracks: React.PropTypes.func,
		getUserTracks: React.PropTypes.func,
		updateSoundcloudUserTracks: React.PropTypes.func,
		updateIsConnectedSC: React.PropTypes.func,
		blurBg: React.PropTypes.func,
		saturateBg: React.PropTypes.func,
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', '0')
		if(this.props.isConnectedSoundcloud)
			this.getUserTracks()

	},

	componentWillUnmount: function() {
		this.props.blurBg(false)
	},

	componentDidMount: function() {
		this.updateBackgroundFilter()
	},

	updateBackgroundFilter: function() {
		if(this.props.choosingTime)
			this.props.blurBg(false)
		else if(this.props.isConnectedSoundcloud)
			this.props.blurBg(false)
		else
			this.props.blurBg(true)
	},

	getUserTracks: function() {
		var success =  (data) => {
			this.props.updateMasasUserTracks(data.songs)
			this.getUserSCTracks()
		}

		var error = () => {
		}

		this.props.getUserTracks(this.props.userPk, success, error)
	},

	getUserSCTracks: function() {
		SC.get(document.MASAS.SC.tracks_uri, {limit: 100}).then( (response) => {  // async call to SC servers
		// SC.get("me/tracks", {limit: 100}).then( (response) => {  // for dev tests
			this.props.updateSoundcloudUserTracks(response)
		})
	},

	connectToSC: function() {
		SC.connect().then( () => {
			this.props.updateIsConnectedSC(true)
			SC.get('/me').then( (r) => {
				// store suername for mobile
				this.props.updateSCusername(r.username)

				// get user track (first from MASAS API (requires log in) and then from SC API)
				this.getUserTracks()
			}).catch( () => {
				this.props.updateSCusername(null)
			})
			this.getUserTracks()
		}).catch( (error) => alert('Error: ' + error.message) )
	},

	tracksTable: function() {
		if (this.props.soundcloudUserTracks)
			return this.props.soundcloudUserTracks.map((track) => { 
				var synced = false
				if(this.props.masasUserTracks.filter(function(song) { return song.SC_ID === track.id }).length)
					synced = true
				
				return <UploadSCItem 
						key={ track.id } 
						track={ track } 
						synced={ synced }
						streamable={ track.streamable }
						public={ track.sharing === "public" ? true : false } />
			})
	},

	logoutSC: function() {
		location.reload()
	},

	componentWillReceiveProps: function(nextProps) {
		if(this.props.choosingTime !== nextProps.choosingTime && nextProps.choosingTime === null)
			this.props.updateTitle('Upload', '0')

		// update masas user track prop to have the sync icon updatd in real time
		if(this.props.choosingTime !== nextProps.choosingTime)
			this.getUserTracks()

		this.updateBackgroundFilter()
	},

	render: function() {
		if(this.props.choosingTime) {
			return (
				<div style={{ 
					visibility: (this.props.modalType === 2 && this.props.isModalOpened) ? 'hidden' : 'visible',
					display: 'flex',
					flex: '1',
				}}>
					<Body>
						<PickTimeUpload 
							visible={ !(this.props.modalType === 2 && this.props.isModalOpened) }/>
					</Body>
				</div>
			)
		}

		if(this.props.isConnectedSoundcloud) {
			return (
				<Body>
				<div className="upload-sc--wrapper">
					<div className="table-head">
						<div className="title">
							Title
						</div>
						<div className="duration">
							Duration
						</div>
						<div className="sync">
							Sync
						</div>
					</div>
					<div className="upload-sc-items--wrapper">
						{ this.tracksTable() }
					</div>
					<div className="logout--wrapper">
						{this.props.SCusername ?
							<span className="logout-text" onClick={this.logoutSC}>
								Log out from <span className="logout-text--username">{this.props.SCusername}</span>
							</span>
							:
							""
						}
					</div>
				</div>
				</Body>
			)
		} else {
			return (
				<Body noBackground={ true }>
					<div className="connect-sc--wrapper">
						<div className="connect-sc--text">
							All the music shared on MASAS starts out in one of the Discover moods
						</div>
						<div className="demo-time-picker--wrapper">
							<TimePicker 
								initialDiscover={ 1 }
								currentDiscover={ 1 }
								/>
						</div>
						<div className="connect-sc--text">
							if the community really <strong>Likes</strong> your songs, it will get featured on <strong>Popular</strong>!
						</div>
						
						{ 
							this.props.MASASuser !== "" ?
								<div className="connect-button">
									<Button 
										onClick={ this.connectToSC } 
										isBigButton={ true }
										soundcloud={ true }>Connect to SoundCloud</Button>
								</div>
							:
								<div className="connect-button">
									<Button 
										onClick={ () => { this.props.toogleModal(); this.props.updateModalContent(<SplashScreen startPage={ 1 } />, 3) } } 
										isSecondaryAction={ true }
										isBigButton={ true }>Log-in to Upload</Button>
									<div className="button-subtitle">It's free!</div>
								</div>
						}
					</div>
				</Body>
				)
		}
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(UploadSC)
