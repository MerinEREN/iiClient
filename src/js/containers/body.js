import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import BodyComponent from "../components/body"
import loadData from "../middlewares/body"
import {toggleDrawer} from "../actions/drawer"
import {resetSnackbar} from "../actions/snackbar"
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
		appState: {snackbar, isFetching}, 
		entitiesBuffered: {userAccount: {account, user}}
	} = state
	return {
		isFetching,
		snackbar, 
		account, 
		user
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		loadData,
		toggleDrawer, 
		resetSnackbar
	},
	dispatch
)

const Body = connect(mapStateToProps, mapDispatchToProps)(BodyComponent)

export default Body
