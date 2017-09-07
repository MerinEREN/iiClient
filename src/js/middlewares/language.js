import {makeLoader} from './utilities'
import {
	languagesSuccess, 
	languagesFailure
} from '../actions/languages'

export const postLanguage = makeLoader({
	defaults: {
		URL: '/languages/', 
		method: 'POST', 
		path: ['languages']
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

export const deleteLanguage = makeLoader({
	defaults: {
		URL: '/languages/', 
		method: 'DELETE', 
		path: ['languages']
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
