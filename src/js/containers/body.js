import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import BodyComponent from "../components/body"
import getRouteContents from "../middlewares/routeContents"
import {toggleDrawer} from "../actions/drawer"
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
		appState: {snackbars, isFetching}, 
		entitiesBuffered: {userLogged}, 
		ui: {contentsByPage: {body}}
	} = state
	return {
		user: userLogged, 
		isFetching,
		snackbars, 
		contents: body
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getRouteContents, 
		toggleDrawer
	},
	dispatch
)

const Body = connect(mapStateToProps, mapDispatchToProps)(BodyComponent)

export default Body
