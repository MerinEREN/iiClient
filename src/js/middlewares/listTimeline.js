import demandsGet from "./demands"
// import offersGet from "./offers"
import servicePacksGet from "./servicePacks"

export default function itemsGet(uID, key, link) {
	var URL = new URL(window.location.href)
	return (dispatch, getState) => {
		if (link) {
			URL = getState().pagination.demands[key].hrefs[link]
		} else {
			URL.pathname = "/demands"
			URL.searchParams.set("uID", uID)
		}
		dispatch(demandsGet({
			URL, 
			key
		}))
		/* 
		if (link) {
			URL = getState().pagination.offers[key].hrefs[link]
		} else {
			URL.pathname = "/offers"
		}
		dispatch(offersGet({
			URL, 
			key
		})) 
		*/
		if (link) {
			URL = getState().pagination.servicePacks[key].hrefs[link]
		} else {
			URL.pathname = "/servicePacks"
		}
		dispatch(servicePacksGet({
			URL, 
			key
		}))
	}
}
