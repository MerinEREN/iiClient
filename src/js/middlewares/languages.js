import {makeLoader} from './utilities'
import {
	languagesRequest, 
	languagesSuccess, 
	languagesFailure
} from '../actions/languages'

const getLanguages = makeLoader({
	defaults: {
		URL: '/languages/', 
		paginationID: 'languages'
	},
	actionCreators: {
		actionsRequest: [languagesRequest],
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}
})

export default getLanguages
