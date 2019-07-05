import React, {Component} from "react"
import PropTypes from "prop-types"
import Chip from "material-ui/Chip"

class ChipCounter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			display: "none"
		}
		this.dataGet = this.dataGet.bind(this)
	}
	componentDidMount() {
		this.interval = setInterval(
			() => this.countGet(), 
			180000
		)
	}
	componentWillUnmount() {
		clearInterval(this.interval)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.count)
			this.setState({display: "flex"})
	}
	countGet() {
		const {
			countGet, 
			URLGet
		} = this.props
		countGet({
			URL: URLGet("timeline", "prev"), 
			key: "timeline"
		})
	}
	dataGet() {
		const {
			itemsGet
		} = this.props
		this.setState({display: "none"})
		itemsGet(null, "timeline", "next")
	}
	render() {
		return <Chip 
			style={{display: this.state.display}}
			onTouchTap={this.dataGet} 
		>
			{this.props.count}
		</Chip>
	}
}

ChipCounter.propTypes = {
	countGet: PropTypes.func.isRequired, 
	count: PropTypes.number,  
	URLGet: PropTypes.func.isRequired, 
	itemsGet: PropTypes.func.isRequired
}

ChipCounter.muiName = "Chip"

export default ChipCounter
