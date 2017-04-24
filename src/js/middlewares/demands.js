import {makeLoader} from './utilities'
import {
	demandsRequest, 
	demandsSuccess, 
	demandsFailure
} from '../actions/demands'

const loadDemands = makeLoader({
	defaults: {
		url: '/demands', 
		groupID: 'all'
	},
	actionCreators: {
		actionsRequest: [demandsRequest],
		actionsSuccess: [demandsSuccess],
		actionsFailure: [demandsFailure]
	}
})

export default loadDemands
