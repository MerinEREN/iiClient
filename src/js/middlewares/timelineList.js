import loadDemands from './demands'
import loadOffers from './offers'
import loadServicePacks from './servicePacks'

export default function loadData(args) {
	return dispatch => {
		dispatch(loadDemands(args))
		dispatch(loadOffers(args))
		dispatch(loadServicePacks(args))
	}
}
