var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Discover.jsx")

var { getTimeIntervalFromURL, isObjectEmpty, isObjectNotEmpty } = require("../../MASAS_functions.jsx")

var ArtworkLine = require("./ArtworkLine.jsx")
var { TimePicker } = require("../UI/UI.jsx")
var { TeachDiscoverModal1, TeachDiscoverModal2 } = require("./TeachDiscoverModals.jsx")

var Discover = React.createClass({
	showArtwork: false,
	showSlider: false,

	propTypes: {
	},

	getInitialState: function() {
		return {
			sliderValue: -1,
		}
	},

	componentWillMount: function() {
		this.props.updateTitle('Discover', '0')		// 0 = menu icon; 1 = arrow back

		// check what discover is playing
		if(this.props.MASAS_songInfo)
			this.props.handleTimePickerChange(getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval))

	},

	componentWillUnmount: function() {
		this.props.closeModal()
	},

	componentDidMount: function() {
	},

	checkUserStep: function() {
		// if user data is available
		if(isObjectNotEmpty(this.props.userData) && !this.props.isModalOpened) {
			// if user has not dismissed tips yet
			let usersteps = [ ...this.props.userData.usersteps ]
			const didUserDismissTips = usersteps.filter(({ step }) => step === 4).length ? true : false
			const didUserSeeFirstTip = usersteps.filter(({ step }) => step === 5).length ? true : false
			const didUserSeeSecondTip = usersteps.filter(({ step }) => step === 6).length ? true : false

			if(!didUserDismissTips && !didUserSeeFirstTip) {
				this.props.updateModalType(2)
				this.props.updateModalContent(<TeachDiscoverModal1 />)
				this.props.toogleModal()
			} else if(!didUserDismissTips && !didUserSeeSecondTip) {
				this.props.updateModalType(2)
				this.props.updateModalContent(<TeachDiscoverModal2 />)
				this.props.toogleModal()
			}
		}
	},

	componentWillReceiveProps: function(nextProps) {
		const target = "#MASAS-modal"
		if(nextProps.modalType === 2 && nextProps.isModalOpened) {
			$(target).mousemove((event) => {
				const sliderValue = (2*event.pageX-$(window).width()/2)/$(window).width() *100
				this.setState({ sliderValue })
			})
		} else if(!nextProps.isModalOpened || nextProps.modalType === 1) {			
			$(target).off('mousemove')
			this.setState({ sliderValue: -1 })
		}
	},

	renderForUITip: function() {

		if(isObjectNotEmpty(this.props.userData) && !this.props.isModalOpened) {
			// if user has not dismissed tips yet
			let usersteps = [ ...this.props.userData.usersteps ]
			const didUserDismissTips = usersteps.filter(({ step }) => step === 4).length ? true : false
			const didUserSeeFirstTip = usersteps.filter(({ step }) => step === 5).length ? true : false
			const didUserSeeSecondTip = usersteps.filter(({ step }) => step === 6).length ? true : false

			if(!didUserDismissTips && !didUserSeeFirstTip && this.props.modalType === 2)
				this.showSlider = true
			else if(!didUserDismissTips && didUserSeeFirstTip && !didUserSeeSecondTip && this.props.modalType === 2) {
				this.showSlider = false
				this.showArtwork = true
			} else {
				this.showSlider = false
				this.showArtwork = false
			}
		}
	},

	render: function() {
		var sliderInitDiscover = null
		if(this.props.MASAS_songInfo)
			sliderInitDiscover = getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval)

		const { showArtwork } = this
		const { showSlider } = this

		// changing state in this.checkUserStep, delaying it until after this.render()
		if(this.props.songPlaying)
			window.setTimeout(() => this.checkUserStep(), 5000)
		
		this.renderForUITip()

		return (
			<div className="discover--wrapper">
				<div 
					className="multi-page--wrapper" 
					style={{ 
						//visibility: (this.props.modalType === 2 && this.props.isModalOpened) ? 'hidden' : 'visible'
					}}>
					<div className={ this.props.discoverNumber === 1 ? "page1" : "page2" }>
						<h1
							style={{
								visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
							}}>
							#EarlyMorning
						</h1>
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={1} />
					</div>
					<div className={ this.props.discoverNumber === 2 ? "page1" : "page2" }>
						<h1
							style={{
								visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
							}}>
							#LateMorning
						</h1>
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={2} />
					</div>
					<div className={ this.props.discoverNumber === 3 ? "page1" : "page2" }>
						<h1
							style={{
								visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
							}}>
							#EarlyAfternoon
						</h1>
						<ArtworkLine
							renderForUITip={ showArtwork }
							discoverNumber={3} />
					</div>
					<div className={ this.props.discoverNumber === 4 ? "page1" : "page2" }>
						<h1
							style={{
								visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
							}}>
							#LateAfternoon
						</h1>
						<ArtworkLine
							renderForUITip={ showArtwork }
							discoverNumber={4} />
					</div>
					<div className={ this.props.discoverNumber === 5 ? "page1" : "page2" }>
						<h1
							style={{
								visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
							}}>
							#EarlyEvening
						</h1>
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={5} />
					</div>
					<div className={ this.props.discoverNumber === 6 ? "page1" : "page2" }>
						<h1
							style={{
								visibility: this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
							}}>
							#LateEvening
						</h1>
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={6} />
					</div>
				</div>
				<div 
					className="time-picker--wrapper"
					style={{
						visibility: !showSlider && this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
					}}>
					<TimePicker 
						canvasId="timePicker--canvas" 
						wrapperClassName="timePicker--wrapper" 
						onSliderChange={ (this.props.modalType === 2 && this.props.isModalOpened) ? () => {} : this.props.handleTimePickerChange } 
						initialDiscover={ sliderInitDiscover ? sliderInitDiscover : 1 }
						currentDiscover={ this.props.discoverNumber }
						showHashtag={ true } 
						sliderValue={ this.state.sliderValue }
						/>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Discover)
