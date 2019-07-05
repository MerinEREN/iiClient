import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import ChipCounterComponent from "../components/chipCounter"
import countGet, {URLGet} from "../middlewares/counters"
import itemsGet from "../middlewares/listTimeline"

const mapStateToProps = state => {
	return {
		count: state.entitiesBuffered.counters.timeline
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		countGet, 
		itemsGet, 
		URLGet
	},
	dispatch
)

const ChipCounter = connect(mapStateToProps, mapDispatchToProps)(ChipCounterComponent)

export default ChipCounter
