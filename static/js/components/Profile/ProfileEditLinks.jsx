var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ProfileEditLinks.jsx")

var { Textbox } = require("../UI/UI.jsx")

var ProfileEditLinks = React.createClass({
	propTypes: {
		textboxValues: React.PropTypes.object,
		updateTextboxValues: React.PropTypes.func,
		show: React.PropTypes.bool.isRequired,		// should comp be shown
	},

	componentWillMount: function() {
		if(this.props.show)
			this.props.userData.link_set.map(({ link }) => {
				// using set timeout to give time to update app state after each map iteration
				window.setTimeout(() => {
					if(link.includes("soundcloud.com"))
						this.updateLink1(link)

					if(link.includes("twitter.com"))
						this.updateLink2(link)

					if(link.includes(".") && !(link.includes("soundcloud.com")) && !(link.includes("facebook.com"))&& !(link.includes("twitter.com")))
						this.updateLink3(link)

					if(link.includes("facebook.com"))
						this.updateLink4(link)
				},0)
			})
	},

	updateLink1: function(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[0] = url
		this.props.updateTextboxValues({ link_set })
	},

	updateLink2: function(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[1] = url
		this.props.updateTextboxValues({ link_set })
	},

	updateLink3: function(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[2] = url
		this.props.updateTextboxValues({ link_set })
	},

	updateLink4: function(url) {
		var link_set = [...this.props.textboxValues.link_set]
		link_set[3] = url
		this.props.updateTextboxValues({ link_set })
	},

	render: function() {
		if(this.props.show)
			return (
				<div className="links-edit--wrapper">
					<div className="link-edit">
						<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud" />
						<Textbox onChange={ this.updateLink1 } value={ this.props.textboxValues.link_set[0] } />
					</div>
					<div className="link-edit">
						<img src="/static/img/twitter.svg" alt="twitter" />
						<Textbox onChange={ this.updateLink2 } value={ this.props.textboxValues.link_set[1] } />
					</div>
					<div className="link-edit">
						<img src="/static/img/MASAS_logo_world.svg" alt="personal page" />
						<Textbox onChange={ this.updateLink3 } value={ this.props.textboxValues.link_set[2] } />
					</div>
					<div className="link-edit">
						<img src="/static/img/facebook.svg" alt="facebook" />
						<Textbox onChange={ this.updateLink4 } value={ this.props.textboxValues.link_set[3] } />
					</div>
				</div>
			)
		else
			return <div></div>
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileEditLinks)