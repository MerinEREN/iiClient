import getDemands from './demands'
import getOffers from './offers'
import getServicePacks from './servicePacks'

export default function getItems(key) {
	return dispatch => {
		dispatch(getDemands(key))
		dispatch(getOffers(key))
		dispatch(getServicePacks(key))
	}
}
