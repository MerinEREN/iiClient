import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CounterChipComponent from '../components/counterChip'
import loadCount, {getURL} from '../middlewares/counters'
import loadItems from '../middlewares/timelineList'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		counter: state.pagination.countersByComponent.timeline
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		loadCount, 
		loadItems, 
		getURL
	},
	dispatch
)

const CounterChip = connect(mapStateToProps, mapDispatchToProps)(CounterChipComponent)

export default CounterChip
