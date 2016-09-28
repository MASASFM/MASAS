var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/CountryAutocomplete.jsx")

var Autocomplete = require('react-autocomplete')

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
			error: () => {
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
		return (
			<div className="MASAS-textbox country-autocomplete--wrapper" style={{ position: 'relative' }}>
				<label htmlFor="cities-autocomplete" className="MASAS-label required">City *</label>
				<Autocomplete
					ref="autocomplete"
					value={ this.state.value }
					items={ this.state.cities }
					getItemValue={ (item) => item.name_ascii }
					// menuStyle={ styles.menuStyle }
					renderMenu={ (items) => {
						return <div className="menu-style">{ items }</div>
					}}
					inputProps={{ 
						className: "MASAS-text-input",
						id: "city",
						name: 'cities'
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
