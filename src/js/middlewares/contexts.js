import makeLoader, {
	isCached
} from "./utilities"
import {
	contextsRequest, 
	contextsSuccess, 
	contextsFailure
} from "../actions/contexts"

const contextsGet = makeLoader({
	defaults: {
		URL: "/contexts", 
		kind: "contexts"
	},
	actionCreators: {
		actionsRequest: [contextsRequest],
		actionsSuccess: [contextsSuccess],
		actionsFailure: [contextsFailure]
	}, 
	options: {
		hideFetching, 
		isCached
	}
})
export const contextsPost = makeLoader({
	defaults: {
		URL: "/contexts", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [contextsRequest],
		actionsSuccess: [contextsSuccess],
		actionsFailure: [contextsFailure]
	}
})
export const contextsPut = makeLoader({
	defaults: {
		URL: "/contexts", 
		method: "PUT", 
		kind: "contexts"
	},
	actionCreators: {
		actionsRequest: [contextsRequest],
		actionsSuccess: [contextsSuccess],
		actionsFailure: [contextsFailure]
	}, 
	options: {
		hideFetching
	}
})
export const contextsDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "contexts"
	},
	actionCreators: {
		actionsRequest: [contextsRequest],
		actionsSuccess: [contextsSuccess],
		actionsFailure: [contextsFailure]
	}, 
	options: {
		hideFetching
	}
})

// Deletes the contexts which only has that page 
// and removes from the contexts which has the page.
export const removeUpdateContextsWithThatPage = ID => 
	(dispatch, getState) => {
		let IDs = []
		let contexts = {}
		Object.values(getState().entities.contexts).forEach( v => {
			// Delete
			if (v.pageIDs.indexOf(ID) !== -1 && v.pageIDs.length === 1)
				IDs.push(v.ID)
			// Modify
			if (v.pageIDs.indexOf(ID) !== -1 && v.pageIDs.length > 1) {
				let IDs2 = []
				for (let v2 of v.pageIDs) {
					if (ID !== v2)
						IDs2.push(v2)
				}
				contexts[v.ID] = {...v, pageIDs: IDs2}
			}
		})
		if (IDs.length > 0) {
			// Update entitiesBuffered and pagination.
			// Reset contextIDsSelected.
			dispatch(contextsRequest({
				method: "DELETE", 
				data: IDs, 
				key: "all"
			}))
			// Update entities.
			dispatch(contextsSuccess({
				method: "DELETE", 
				data: IDs, 
				key: "all"
			}))
		}
		if (Object.keys(contexts).length > 0) {
			// Update entities and entitiesBuffered.
			dispatch(contextsSuccess({
				method: "PUT", 
				response: contexts, 
				key: "all"
			}))
		}
	}

export default contextsGet
