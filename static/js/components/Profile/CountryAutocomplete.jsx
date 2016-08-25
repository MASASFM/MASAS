var React = require("react")
var ReactDOM = require("react-dom")

// var ReactRedux = require("react-redux")
// var { mapStateToProps, mapDispatchToProps } = require("./containers/CountryAutocomplete.jsx")

var Autocomplete = require('react-autocomplete')

// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var CountryAutocomplete = React.createClass({
	propTypes: {
	},

	getInitialState: function() {
		var city = []

		return {
			value: '',
			cities: city,
			loading: false
		}
	},

	componentDidMount: function() {
		this.getCities()
	},

	getCities: function() {
		$.ajax({
			type: 'GET',
			url: '/api/cities/?q=' + this.state.value,
			success: ({ results }) => {
				this.setState({
					cities: results
				})
			},
			error: (e) => {
				console.log(e)
			}
		})
	},

	render: function() {
		var styles = {
			item: {
				padding: '2px 6px',
				cursor: 'default',
				color: 'green'
			},

			highlightedItem: {
				color: 'red',
				background: 'hsl(200, 50%, 50%)',
				padding: '2px 6px',
				cursor: 'default'
			},

			menu: {
				border: 'solid 1px #ccc'
			}
		}

		return (
			<div>
				<Autocomplete
					inputProps={{ name: 'cities', id: 'cities-autocomplete'}}
					ref="autocomplete"
					value={ this.state.value }
					items={ this.state.cities }
					getItemValue={ (item) => item.name_ascii}
					onSelect={ (value, item) => {
						this.setState({ value: item.display_name, cities: [ item ]})
					}}
					onChange={ (event, value) => {
						this.setState({ value, loading: true })
						this.getCities()
					}}
					renderItem={ (item, isHighlighted ) => (
						<div
							  style={isHighlighted ? styles.highlightedItem : styles.item}
							  key={item.geoname_id}
							  id={item.geoname_id}>
							  {item.display_name}
						</div>
					)}
				/>
			</div>
		)
	}
})

module.exports = CountryAutocomplete
// ReactRedux.connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(CountryAutocomplete)