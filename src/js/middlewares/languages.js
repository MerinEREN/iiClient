import {makeLoader} from './utilities'
import {
	languagesRequest, 
	languagesSuccess, 
	languagesFailure
} from '../actions/languages'

const getLanguages = makeLoader({
	defaults: {
		URL: '/languages', 
		path: ['languages']
	},
	actionCreators: {
		actionsRequest: [languagesRequest],
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}, 
	options: {
		// CAN BE PROBLEMATIC FOR PAGINATION IN NEAR FUTURE !!!!!!!!!!!!!!!!!!!!!!!
		didInvalidate: false
	}
})

export default getLanguages
