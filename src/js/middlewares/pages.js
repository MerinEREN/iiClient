import {makeLoader} from './utilities'
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from '../actions/pages'

const getPages = makeLoader({
	defaults: {
		URL: '/pages/', 
		path: ['pages']
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}
	})

export default getPages
