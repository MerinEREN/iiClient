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
		this.setState({display: "flex"})
	}
	countGet() {
		const {
			countGet, 
			URLGet
		} = this.props
		// CHANGE THE URL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		countGet({
			URL: URLGet("timeline", "nextPageURL"), 
			key: "timeline"
		})
	}
	dataGet() {
		this.setState({display: "none"})
		this.props.itemsGet(null, "timeline", "nextPageURL")
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
