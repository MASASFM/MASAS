var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/UploadSC.jsx")

var { isObjectNotEmpty } = require("../../MASAS_functions.jsx")
import { MobileBlurBackground } from "../MASAS_mixins.jsx"

var { Button, Body } = require("../UI/UI.jsx")
var UploadSCItem = require("./UploadSCItem.jsx")
var PickTimeUpload = require("./PickTimeUpload.jsx")
var TeachUploadModals = require("./TeachUploadModals.jsx")
var TeachUploadModal1 = TeachUploadModals.TeachUploadModal1


var UploadSC = React.createClass({
	mixins: [ MobileBlurBackground ],
	
	propTypes: {
		isConnectedSoundcloud: React.PropTypes.bool,
		choosingTime: React.PropTypes.bool,
		isModalOpened: React.PropTypes.bool,
		userData: React.PropTypes.object,
		userPk: React.PropTypes.string,
		masasUserTracks: React.PropTypes.array,
		modalType: React.PropTypes.number,
		SCusername: React.PropTypes.string,
		soundcloudUserTracks: React.PropTypes.array,

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
	},

	componentWillMount: function() {
		this.props.updateTitle('Upload', '0')
		if(this.props.isConnectedSoundcloud)
			this.getUserTracks()
	},

	componentDidMount: function() {
	},

	componentWillReceiveProps: function(nextProps) {
		if(this.props.choosingTime !== nextProps.choosingTime && nextProps.choosingTime === null)
			this.props.updateTitle('Upload', '0')

		// update masas user track prop to have the sync icon updatd in real time
		if(this.props.choosingTime !== nextProps.choosingTime)
			this.getUserTracks()
	},

	checkUserStep: function() {
		// if user data is available
		if(isObjectNotEmpty(this.props.userData) && !this.props.isModalOpened) {
			// if user has not dismissed tips yet
			let usersteps = [ ...this.props.userData.usersteps ]
			const didUserDismissTips = usersteps.filter(({ step }) => step === 4).length ? true : false
			const didUserSeeFirstTip = usersteps.filter(({ step }) => step === 5).length ? true : false

			if(!didUserDismissTips && didUserSeeFirstTip) {
				window.setTimeout(() => {
					this.props.updateModalType(2)
					this.props.updateModalContent(<TeachUploadModal1 />)
					this.props.toogleModal()
				}, 1000)
			}
		}
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

				return <UploadSCItem key={track.id} track={ track } synced={synced}/>
			})
	},

	logoutSC: function() {
		location.reload()
	},

	render: function() {
		if(this.props.choosingTime)
			return (
				<div style={{ 
					visibility: (this.props.modalType === 2 && this.props.isModalOpened) ? 'hidden' : 'visible',
					display: 'flex',
					flex: '1',
				}}>
					<Body>
						<PickTimeUpload 
							checkUserStep={ this.checkUserStep }
							visible={ !(this.props.modalType === 2 && this.props.isModalOpened) }/>
					</Body>
				</div>
			)

		if(this.props.isConnectedSoundcloud) 
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
		else {

			return (
				<Body>

				<div className="connect-sc--wrapper">
					<div className="connect-sc--header">
						<img src="/static/img/MASAS_logo_soundcloud.svg" className="SC-logo" alt="soundcloud sync" />
						<img src="/static/img/MASAS_icon_synch_separator.svg" className="sync-icon" alt="soundcloud sync" />
						<img src="/static/img/MASAS_logo-M.svg" className="MASAS-logo" alt="soundcloud sync" />
					</div>
					<p>
						Connect your Souncloud account to MASAS and start sharing your songs in a click.
					</p>
					<div className="connect-button">
						<Button 
							onClick={ this.connectToSC } 
							isBigButton={ true }
							soundcloud={ true }>Connect to SoundCloud</Button>
					</div>
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