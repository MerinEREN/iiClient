import loadDemands from './demands'
import loadOffers from './offers'
import loadServicePacks from './servicePacks'

export default function loadData() {
	return dispatch => {
		dispatch(loadDemands())
		dispatch(loadOffers())
		dispatch(loadServicePacks())
	}
}
