import {makeLoader} from "./utilities"
import {
	contentsRequest, 
	contentsSuccess, 
	contentsFailure
} from "../actions/contents"

const getContents = makeLoader({
	defaults: {
		URL: "/contents", 
		kind: "contents"
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		didInvalidate: false
	}
})

export const postContents = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/contents"
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const putContents = makeLoader({
	defaults: {
		method: "PUT", 
		URL: "/contents", 
		kind: "contents"
	},
	actionCreators: {
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const deleteContents = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "contents"
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

// Deletes contents which only has that page and removes from contents which has the page.
export const removeUpdateContentsWithThatPage = ID => 
	(dispatch, getState) => {
		let IDs = []
		let contents = {}
		Object.values(getState().entities.contents).forEach( v => {
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
				contents[v.ID] = {...v, pageIDs: IDs2}
			}
		})
		// Update entitiesBuffered and pagination
		dispatch(contentsRequest({
			method: "DELETE", 
			response: {result: IDs}, 
			key: "all"
		}))
		// Update entities and pagination
		// Reset contentIDsSelected
		dispatch(contentsSuccess({
			method: "DELETE", 
			response: {result: {...getState().entitiesBuffered.contents}}, 
			key: "all"
		}))
		// Update entities and entitiesBuffered
		dispatch(contentsSuccess({
			method: "PUT", 
			response: {result: contents}, 
			key: "all", 
			mergeIntoState: true
		}))
	}

export default getContents
