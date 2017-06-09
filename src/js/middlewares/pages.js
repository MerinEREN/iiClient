import {makeLoader} from './utilities'
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from '../actions/pages'

const loadPages = makeLoader({
	defaults: {
		URL: '/pages/', 
		paginationID: 'pages'
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}
	})

export default loadPages
