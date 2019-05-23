import demandsGet from "./demands"
// import offersGet from "./offers"
import servicePacksGet from "./servicePacks"

export default function itemsGet(uID, key, paginationURL) {
	return (dispatch, getState) => {
		dispatch(demandsGet({
			URL: paginationURL ? 
			getState().pagination.demands[key][paginationURL] : 
			`/demands?q=${uID}`, 
			key
		}))
		/* dispatch(offersGet({
			URL: paginationURL ? 
			getState().pagination.offers[key][paginationURL] : 
			`/offers?q=${uID}`, 
			key
		})) */
		dispatch(servicePacksGet({
			URL: paginationURL ? 
			getState().pagination.servicePacks[key][paginationURL] : 
			`/servicePacks?q=${uID}`, 
			key
		}))
	}
}
