import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CounterChipComponent from '../components/counterChip'
import loadData, {getUrl} from '../middlewares/counters'
import loadItems from '../middlewares/timelineList'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		counter: state.pagination.counters.timeline
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		loadData, 
		loadItems, 
		getUrl
	},
	dispatch
)

const CounterChip = connect(mapStateToProps, mapDispatchToProps)(CounterChipComponent)

export default CounterChip
