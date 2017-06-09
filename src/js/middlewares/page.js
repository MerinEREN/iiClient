import {makeLoader} from './utilities'
import {
	pagePostRequest, 
	pagePostSuccess, 
	pagePostFailure
} from '../actions/page'

export const postPage = makeLoader({
	defaults: {
		URL: '/pages/', 
		method: 'POST'
	},
	actionCreators: {
		actionsRequest: [pagePostRequest],
		actionsSuccess: [pagePostSuccess],
		actionsFailure: [pagePostFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
