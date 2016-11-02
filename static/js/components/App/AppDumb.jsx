// Main App layoutvar React = require("react")

var React = require("react")
var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/AppDumb.jsx")


var Header = require("../Header/Header.jsx")
var Footer = require("../Footer/Footer.jsx")
var Home = require("../Home/Home.jsx")
var NavSidebar = require("../NavSidebar/NavSidebar.jsx")
var { Modal } = require("../UI/UI.jsx")
var PlayerAudioTag = require("../Player/PlayerAudioTag.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var AppDumb = React.createClass({
	propTypes: {
		children: React.PropTypes.element,
		bgFilter: React.PropTypes.object,
		isModalOpened: React.PropTypes.bool,
		modalType: React.PropTypes.number,
		modalContent: React.PropTypes.element,

		closeModal: React.PropTypes.func,

		hideLoadingModalZIndex: React.PropTypes.number,			// loading modal z-index
		loadingModalAnim: React.PropTypes.string,				// loading modal animation
	},

	getDefaultProps: function() {
		return {
			hideLoadingModalZIndex: 100,
			loadingModalAnim: "fadeout-loading-modal 1s linear",
		}
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<NavSidebar>
				<div style = { styles.container } id="mobile-safari-bug-fix--wrapper" >
					<div 
						className={
							"body--background"
							+ 
							( this.props.bgFilter.blurred ? " blurred " : "" )
							+ 
							( this.props.bgFilter.saturated ? " saturated " : "" )
							+ 
							( this.props.bgFilter.mobileBlurred ? " blurred-mobile " : "" )
							+ 
							( this.props.bgFilter.mobileSaturated ? " mobileSaturated " : "" )
							+ 
							( this.props.bgFilter.modalBlurred ? " modal-blurred " : "" )
							+ 
							( this.props.bgFilter.modalSaturated ? " modal-saturated " : "" )
						} 
						id="body--background">
						<div className="bg-image" id="app-bg-image"></div>
					</div>
					<Header />
						<div 
							className={ "modal-blur--wrapper" + ( this.props.isModalOpened && this.props.modalType !== 2 ? " blurred" : "" )}
							style={{
								opacity: !(this.props.isModalOpened && this.props.modalType === 4) ? 1 : 0,
							}}>
							{
								this.props.children ? 
									this.props.children
								:
									<Home />
							}
						</div>
						<div
							style={{
								position: 'fixed',
								top: 0,
								bottom: 0,
								left: 0,
								right: 0,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'black',
								zIndex: this.props.hideLoadingModalZIndex,
								animation: this.props.loadingModalAnim,
								color: 'white'
							}}>
							<img
								style={{
									height: '7rem',
									width: '7rem',
								}}
								src="/static/img/MASAS_logo-M.svg" 
								alt="loading" />
						</div>

					<Footer />
								
				</div>
				<PlayerAudioTag />
				<Modal 
					isOpened={ this.props.isModalOpened }
					closeModalFunc={ this.props.closeModal }
					type={ this.props.modalType }>
					{ this.props.modalContent }
				</Modal>
			</NavSidebar>
		)
	}
})

var styles = {
	container: {
		height: window.innerHeight + 'px',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'black',
	}
}

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(AppDumb)