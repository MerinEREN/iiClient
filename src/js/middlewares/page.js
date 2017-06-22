import {makeLoader} from './utilities'
import {
	pagesSuccess, 
	pagesFailure
} from '../actions/pages'

export const postPage = makeLoader({
	defaults: {
		URL: '/pages/', 
		method: 'POST', 
		paginationID: 'pages'
	},
	actionCreators: {
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
