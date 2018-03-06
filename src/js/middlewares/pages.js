import {makeLoader} from './utilities'
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from '../actions/pages'

const getPages = makeLoader({
	defaults: {
		URL: '/pages', 
		path: ['pages']
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}, 
	options: {
		didInvalidate: false, 
		hideFetching: true
	}
})
export const postPage = makeLoader({
	defaults: {
		URL: '/pages', 
		method: 'POST', 
		path: ['pages']
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

export default getPages
