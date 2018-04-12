import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BodyComponent from '../components/body'
import loadData from '../middlewares/body'
import {toggleDrawer} from '../actions/drawer'
import {resetSnackbar} from '../actions/snackbar'
// Needed for onTouchTap, REMOVE WHEN REACT HAS THIS FEATURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// It's a mobile friendly onClick() alternative for all components in Material-UI 
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const getFirstAccount = as => {
	var account
	Object.values(as).forEach((v, i) => {
		if(i === 0)
			account = v
	})
	return account
}

const getFirstUser = us => {
	var user
	Object.values(us).forEach((v, i) => {
		if(i === 0)
			user = v
	})
	return user
}

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
		entitiesBuffered: {accounts, users}
	} = state
	return {
		isFetching,
		snackbar, 
		acc: getFirstAccount(accounts), 
		user: getFirstUser(users)
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
