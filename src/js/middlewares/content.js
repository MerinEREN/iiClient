import {makeLoader} from './utilities'
import {
	contentsSuccess, 
	contentsFailure
} from '../actions/contents'

export const deleteContent = makeLoader({
	defaults: {
		method: 'DELETE', 
		path: ['contents']
	},
	actionCreators: {
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

