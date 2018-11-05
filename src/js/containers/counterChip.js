import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import CounterChipComponent from "../components/counterChip"
import getCount, {getURL} from "../middlewares/counters"
import getItems from "../middlewares/timelineList"

const mapStateToProps = state => {
	return {
		count: state.appState.counters.timeline || 0
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getCount, 
		getItems, 
		getURL
	},
	dispatch
)

const CounterChip = connect(mapStateToProps, mapDispatchToProps)(CounterChipComponent)

export default CounterChip
