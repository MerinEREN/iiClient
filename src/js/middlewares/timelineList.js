import loadDemands from './demands'
import loadOffers from './offers'
import loadServicePacks from './servicePacks'

export default function loadData({dArgs, oArgs, spArgs}) {
	return dispatch => {
		dispatch(loadDemands(dArgs))
		dispatch(loadOffers(oArgs))
		dispatch(loadServicePacks(spArgs))
	}
}
