import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import BodyComponent from "../components/body"
import getRouteContents from "../middlewares/routeContents"
import {toggleDrawer} from "../actions/drawer"
import {tagsByFilterGet} from "../middlewares/tags"
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
		ui: {
			contentsByPage: {body}
		}, 
		entitiesBuffered: {
			userLogged, 
			tagsByUser
		}, 
		appState: {
			snackbars, 
			isFetching
		}
	} = state
	return {
		contents: body, 
		user: userLogged, 
		userTags: tagsByUser[userLogged.ID] || {}, 
		snackbars, 
		isFetching
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getRouteContents, 
		toggleDrawer, 
		tagsByFilterGet
	},
	dispatch
)

const Body = connect(mapStateToProps, mapDispatchToProps)(BodyComponent)

export default Body
