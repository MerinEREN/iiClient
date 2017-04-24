import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'

class CounterChip extends Component {
	constructor(props) {
		super(props)
		this.state = {display: 'none'}
		this.getData = this.getData.bind(this)
	}
	componentDidMount() {
		// Get timeline items count every 5 minutes.
		this.loadDataInterval = setInterval(() => this.getCount(), 300000)
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
		const {counter, loadData, getUrl} = this.props
		getUrl('/timeline')
		loadData({
			url: counter.nextPageUrl, 
			groupID: 'timeline'
		})
	}
	getData() {
		this.setState({display: 'none'})
		const {counter, loadItems, getUrl} = this.props
		getUrl('/timeline', 'd=next')
		loadItems({
			url: counter.nextPageUrl, 
			groupID: 'timeline'
		})
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
	loadData: PropTypes.func.isRequired, 
	loadItems: PropTypes.func.isRequired, 
	getUrl: PropTypes.func.isRequired 
}

CounterChip.muiName = 'Chip'

export default CounterChip
