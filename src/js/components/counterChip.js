import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'

class CounterChip extends Component {
	constructor(props) {
		super(props)
		this.state = {display: 'none'}
		this.getData = this.getData.bind(this)
	}
	componentWillMount() {
		// Get timeline items count every 5 minutes.
		this.loadDataInterval = setInterval(
			() =>this.getCount(), 60000
		)
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.counter.value) {
			// Not sure about "display: 'block'", check from documantation.
			this.setState({display: 'block'})
		} else {
			this.setState({display: 'none'})
		}
	}
	getCount() {
		const {loadCount, getURL} = this.props
		loadCount({
			URL: getURL('timeline', 'nextPageURL')
		})
	}
	getData() {
		this.setState({display: 'none'})
		const {loadItems} = this.props
		loadItems(
			{
				dArgs: {
					returnedURL: 'nextPageURL', 
					groupID: 'timeline'
				}, 
				oArgs: {
					returnedURL: 'nextPageURL', 
					groupID: 'timeline'
				}, 
				spArgs: {
					returnedURL: 'nextPageURL', 
					groupID: 'timeline'
				}
			}
		)
	}
	componentWillUnmount() {
		clearInterval(this.loadDataInterval)
	}
	render() {
		return <Chip 
			onTouchTap={this.getData} 
			style={{display: this.state.display}}
		>
			{this.props.counter.value}
		</Chip>
	}
}

// 'counter' is to prevent 'undefined.value' error
CounterChip.defaultProps = {
	counter: {}
}

CounterChip.propTypes = {
	counter: PropTypes.object.isRequired, 
	loadCount: PropTypes.func.isRequired, 
	loadItems: PropTypes.func.isRequired, 
	getURL: PropTypes.func.isRequired 
}

CounterChip.muiName = 'Chip'

export default CounterChip
