var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/FiltersModal.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var FiltersModal = React.createClass({
	propTypes: {
		toogleModal: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		hashtagFilter: React.PropTypes.array,
	},

	componentWillMount: function() {
	},

	toggleFilter: function(hashtagNumber) {
		console.log('FILTER')
		this.props.toogleHashtag(hashtagNumber)
	},

	render: function() {
		return (
			<div className="filters-modal--wrapper">
				<h1>Filter for:</h1>
				<div onClick={ this.toggleFilter.bind(this, 0) } className={ "filter " + ( this.props.hashtagFilter[0] ? "active" : "" )}># EarlyMorning</div>
				<div onClick={ this.toggleFilter.bind(this, 1) } className={ "filter " + ( this.props.hashtagFilter[1] ? "active" : "" )}># LateMorning</div>
				<div onClick={ this.toggleFilter.bind(this, 2) } className={ "filter " + ( this.props.hashtagFilter[2] ? "active" : "" )}># EarlyAfternoon</div>
				<div onClick={ this.toggleFilter.bind(this, 3) } className={ "filter " + ( this.props.hashtagFilter[3] ? "active" : "" )}># LateAfternoon</div>
				<div onClick={ this.toggleFilter.bind(this, 4) } className={ "filter " + ( this.props.hashtagFilter[4] ? "active" : "" )}># EarlyEvening</div>
				<div onClick={ this.toggleFilter.bind(this, 5) } className={ "filter " + ( this.props.hashtagFilter[5] ? "active" : "" )}># LateEvening</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(FiltersModal)