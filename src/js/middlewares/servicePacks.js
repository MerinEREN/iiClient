import {makeLoader} from './utilities'
import {
	servicePacksRequest, 
	servicePacksSuccess, 
	servicePacksFailure
} from '../actions/servicePacks'

const loadServicePacks = makeLoader({
	defaults: {
		URL: '/servicePacks/', 
		paginationID: 'servicePacks', 
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest],
		actionsSuccess: [servicePacksSuccess],
		actionsFailure: [servicePacksFailure]
	}
	})

export default loadServicePacks
