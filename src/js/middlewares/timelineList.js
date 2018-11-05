import getDemands from "./demands"
import getOffers from "./offers"
import getServicePacks from "./servicePacks"

export default function getItems(uID, key) {
	return dispatch => {
		dispatch(getDemands({
			URL: `/demands?uID=${uID}`, 
			key
		}))
		dispatch(getOffers({
			URL: `/offers?uID=${uID}`, 
			key
		}))
		dispatch(getServicePacks({
			URL: `/servicePacks?uID=${uID}`, 
			key
		}))
	}
}
