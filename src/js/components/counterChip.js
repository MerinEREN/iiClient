import React, {Component} from "react"
import PropTypes from "prop-types"
import Chip from "material-ui/Chip"

class CounterChip extends Component {
	constructor(props) {
		super(props)
		this.state = {display: "none"}
		this.getData = this.getData.bind(this)
	}
	componentWillMount() {
		this.loadDataInterval = setInterval(
			() => this.getCount(), 180000
		)
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.count) {
			// Not sure about "display: "block"", check from documantation.
			this.setState({display: "block"})
		} else {
			this.setState({display: "none"})
		}
	}
	getCount() {
		const {id, getCount, getURL} = this.props
		getCount({
			URL: getURL("timeline", "nextPageURL"), 
			key: id
		})
	}
	getData() {
		this.setState({display: "none"})
		this.props.getItems(
			{
				dArgs: {
					returnedURL: "nextPageURL", 
					groupID: "timeline"
				}, 
				oArgs: {
					returnedURL: "nextPageURL", 
					groupID: "timeline"
				}, 
				spArgs: {
					returnedURL: "nextPageURL", 
					groupID: "timeline"
				}
			}
		)
	}
	componentWillUnmount() {
		clearInterval(this.loadDataInterval)
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
	id: PropTypes.string.isRequired, 
	count: PropTypes.number,  
	getCount: PropTypes.func.isRequired, 
	getItems: PropTypes.func.isRequired, 
	getURL: PropTypes.func.isRequired 
}

CounterChip.muiName = "Chip"

export default CounterChip
