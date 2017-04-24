import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TimelineComponent from '../components/timeline'
import {add, remove} from '../actions/timeline'

const mapStateToProps = (state) => {
	return {
		toDos: state.entities.toDos.byId
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addNewToDo: add,
		removeToDo: remove
	},
		dispatch
	)
}

const Timeline = connect(mapStateToProps, mapDispatchToProps)(TimelineComponent)

export default Timeline
