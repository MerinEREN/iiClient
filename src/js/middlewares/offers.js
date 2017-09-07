import {makeLoader} from './utilities'
import {
	offersRequest, 
	offersSuccess, 
	offersFailure
} from '../actions/offers'

const loadOffers = makeLoader({
	defaults: {
		URL: '/offers/', 
		path: ['offersByAccount']
	},
	actionCreators: {
		actionsRequest: [offersRequest],
		actionsSuccess: [offersSuccess],
		actionsFailure: [offersFailure]
	}
	})

export default loadOffers
