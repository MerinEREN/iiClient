import React, {Component} from "react"
import PropTypes from "prop-types"
import Chip from "material-ui/Chip"

class CounterChip extends Component {
	constructor(props) {
		super(props)
		this.state = {display: "none"}
		this.getData = this.getData.bind(this)
	}
	componentDidMount() {
		this.loadDataInterval = setInterval(
			() => this.getCount(), 
			180000
		)
	}
	componentWillUnmount() {
		clearInterval(this.loadDataInterval)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.count)
			this.setState({display: "flex"})
	}
	getCount() {
		const {
			getCount, 
			getURL
		} = this.props
		getCount({
			URL: getURL("timeline", "nextPageURL"), 
			key: "timeline"
		})
	}
	getData() {
		this.setState({display: "none"})
		this.props.getItems(null, "timeline", "nextPageURL")
	}
	render() {
		return <Chip 
			style={{display: this.state.display}}
			onTouchTap={this.getData} 
		>
			{this.props.count}
		</Chip>
	}
}

CounterChip.propTypes = {
	count: PropTypes.number,  
	getCount: PropTypes.func.isRequired, 
	getItems: PropTypes.func.isRequired, 
	getURL: PropTypes.func.isRequired 
}

CounterChip.muiName = "Chip"

export default CounterChip
