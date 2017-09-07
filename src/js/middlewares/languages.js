import {makeLoader} from './utilities'
import {
	languagesRequest, 
	languagesSuccess, 
	languagesFailure
} from '../actions/languages'

const getLanguages = makeLoader({
	defaults: {
		URL: '/languages/', 
		path: ['languages']
	},
	actionCreators: {
		actionsRequest: [languagesRequest],
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}, 
	options: {
		didInvalidate: false
	}
})

export default getLanguages
