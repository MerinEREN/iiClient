import {makeLoader} from './utilities'
import {
	languagesSuccess, 
	languagesFailure
} from '../actions/languages'

export const postLanguage = makeLoader({
	defaults: {
		URL: '/languages/', 
		method: 'POST', 
		paginationID: 'languages'
	},
	actionCreators: {
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
