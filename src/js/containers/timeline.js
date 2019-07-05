import {connect} from "react-redux"
import timelineComponent from "../components/timeline"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination, 
		entitiesBuffered
	} = state
	return {
		contexts: pagination.contexts.timeline && 
		filterAnObjectByKeys(
			entitiesBuffered.contexts, 
			pagination.contexts.timeline.IDs
		)
	}
}

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const timeline = connect(mapStateToProps, null)(timelineComponent)

export default timeline
