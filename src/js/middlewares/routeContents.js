import {makeLoader} from "./utilities"
import {
	routeContentsSuccess
} from "../actions/routeContents"

const getRouteContents = makeLoader({
	defaults: {
		kind: "contents"
	},
	actionCreators: {
		actionsSuccess: [routeContentsSuccess]
	}, 
	options: {
		hideFetching: true, 
		isCached: (state, key) => state.ui.contents[key]
	}
})

export default getRouteContents