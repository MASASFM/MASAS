var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/CountryAutocomplete.jsx")

var Autocomplete = require('react-autocomplete')

// var {goToURL} = require("../../MASAS_functions.jsx")
// var { Link } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var CountryAutocomplete = React.createClass({
	counter: 0,

	propTypes: {
		onChange: React.PropTypes.func,
		userCity: React.PropTypes.object,
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

		if(this.props.userCity !== null)
			this.setState({ value: this.props.userCity.display_name})
	},

	getCities: function() {
		$.ajax({
			type: 'GET',
			url: '/api/cities/?q=' + this.state.value,
			success: ({ results }) => {
				this.setState({
					cities: results.splice(0,15)
				})
			},
			error: (e) => {
			}
		})
	},

	onChange: function(event, value) {
		this.counter = this.counter + 1
		var { counter } = this

		this.setState({ value })

		window.setTimeout(() => {
			if(counter === this.counter) {
				this.setState({ loading: true })
				this.getCities()
				this.props.onChange("")
			}
		}, 500)
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
			},

			menuStyle: {
				borderRadius: '3px',
				boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
				background: 'rgba(255, 255, 255, 0.9)',
				padding: '2px 0',
				fontSize: '90%',
				position: 'absolute',
				overflow: 'auto',
				maxHeight: 200 + 'px',
				top: '100%',
				left: 0,
			},

			wrapperStyle: {
				display: 'flex'
			}
		}

		return (
			<div className="MASAS-textbox country-autocomplete--wrapper" style={{ position: 'relative' }}>
				<label htmlFor="cities-autocomplete" className="MASAS-label">City</label>
				<Autocomplete
					inputProps={{ name: 'cities', id: 'cities-autocomplete' }}
					ref="autocomplete"
					value={ this.state.value }
					items={ this.state.cities }
					getItemValue={ (item) => item.name_ascii }
					// menuStyle={ styles.menuStyle }
					renderMenu={ (items, value, style) => {
						return <div className="menu-style">{ items }</div>
					}}
					inputProps={{ 
						className: "MASAS-text-input",
						id: "city",
					}}
					wrapperProps={{
						className: "MASAS-textbox--wrapper wrapper-style"
					}}
					// wrapperStyle={ styles.wrapperStyle }
					onSelect={ (value, item) => {
						this.setState({ value: item.display_name, cities: [ item ]})
						this.props.onChange(item.url)
					}}
					onChange={ this.onChange }
					renderItem={ (item, isHighlighted ) => (
						<div
							  className={isHighlighted ? "highlighted-item" : 'item'}
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

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(CountryAutocomplete)