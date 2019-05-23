import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import BodyComponent from "../components/body"
import contextsGet from "../middlewares/contexts"
import drawerToggle from "../actions/drawer"
import {filterAnObjectByKeys} from "../middlewares/utilities"
// Needed for onTouchTap, REMOVE WHEN REACT HAS THIS FEATURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// It"s a mobile friendly onClick() alternative for all components in Material-UI 
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

// Can use "ownProps" here
// For accessing params for example.
const mapStateToProps = state => {
	/* const { selectedReddit, postsByReddit } = state
	  const {
		      isFetching,
		      lastUpdated,
		      items: posts
		    } = postsByReddit[selectedReddit] || {
				isFetching: true,
				items: []
			      }

	  return {
		      selectedReddit,
		      posts,
		      isFetching,
		      lastUpdated
		    } */
	const {
		pagination: {
			contexts: {body}, 
			users: {logged}, 
			tags: tagsPagination
		}, 
		entitiesBuffered: {
			contexts, 
			users, 
			tags
		}, 
		appState: {
			snackbars, 
			isFetching
		}
	} = state
	return {
		contexts: body && filterAnObjectByKeys(contexts, body.IDs), 
		user: logged && users[logged.IDs[0]], 
		tagsUser: (logged && tagsPagination[logged.IDs[0]]) && 
		filterAnObjectByKeys(tags, tagsPagination[logged.IDs[0]].IDs), 
		snackbars, 
		isFetching
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		contextsGet, 
		drawerToggle
	},
	dispatch
)

const Body = connect(mapStateToProps, mapDispatchToProps)(BodyComponent)

export default Body
