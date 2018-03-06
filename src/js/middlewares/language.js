import {makeLoader} from './utilities'
import {
	languagesSuccess, 
	languagesFailure
} from '../actions/languages'

export const deleteLanguage = makeLoader({
	defaults: {
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
