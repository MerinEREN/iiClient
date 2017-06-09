import React from "react"
import {Route, IndexRoute} from 'react-router'
import Body  from './containers/body'
import Timeline  from './components/timeline'
import Dashboard  from './components/dashboard'
import Pages  from './containers/pages'
import Account  from './components/account'
import Demands  from './components/demands'
import Offers  from './components/offers'
import ServicePacks  from './components/servicePacks'
import Settings  from './components/settings'
import Feedback  from './components/feedback'
import Help  from './components/help'

// AVOIDING GETTING ERROR WHEN RE-RENDERING BECAUSE OF muiTheme CHANGES !!!!!!!!!!!!!!!!!!!
const routes = (
	<Route path="/" component={Body}>
		<IndexRoute component={Timeline} />
		<Route path="dashboard" component={Dashboard} />
		<Route path="pages" component={Pages} />
		<Route path="demands" component={Demands} />
		<Route path="offers" component={Offers} />
		<Route path="servicePacks" component={ServicePacks} />
		<Route path="settings" component={Settings} />
		<Route path="accountSettings" component={Settings} />
		<Route path="userSettings" component={Settings} />
		<Route path="feedback" component={Feedback} />
		<Route path="help" component={Help} />
		<Route path="accounts/(:acc)" component={Account} />
		<Route path="accounts/(:acc)/Demands" component={Demands} />
		<Route path="accounts/(:acc)/Offers" component={Offers} />
		<Route path="accounts/(:acc)/ServicePacks" component={ServicePacks} />
	</Route>
)

export default routes
