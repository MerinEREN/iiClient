import {makeLoader} from './utilities'
import {
	servicePacksRequest, 
	servicePacksSuccess, 
	servicePacksFailure
} from '../actions/servicePacks'

const loadServicePacks = makeLoader({
	defaults: {
		url: '/servicePacks', 
		groupID: 'all'
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest],
		actionsSuccess: [servicePacksSuccess],
		actionsFailure: [servicePacksFailure]
	}
})

export default loadServicePacks
