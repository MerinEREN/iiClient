import React from "react"
import Route from "react-router/lib/Route"
import IndexRoute from "react-router/lib/IndexRoute"
import Redirect from "react-router/lib/Redirect"
import IndexRedirect from "react-router/lib/IndexRedirect"
import Body  from "./containers/body"
import Timeline  from "./components/timeline"
import Dashboard  from "./components/dashboard"
import Languages  from "./containers/languages"
import Pages  from "./containers/pages"
import Page  from "./containers/page"
import Contents from "./containers/contents"
import Account  from "./components/account"
import Demands  from "./components/demands"
import Offers  from "./components/offers"
import ServicePacks  from "./components/servicePacks"
import Settings  from "./components/settings"
import Feedback  from "./components/feedback"
import Help  from "./components/help"

// AVOIDING GETTING ERROR WHEN RE-RENDERING BECAUSE OF muiTheme CHANGES !!!!!!!!!!!!!!!!!!!
// PRECEDENCE (matching routes in the order they are defined) IS IMPORTANT !!!!!!!!!!!!!!!!
// Add a control for path=":ID" 
// like onEnter={(nextState, replace) => {if (notMatch) replace("/")}}.
const routes  = <Route path="/" component={Body}>
	<IndexRoute component={Timeline} />
	<Route path="dashboard" component={Dashboard} />
	<Route path="languages" component={Languages} />
	<Route path="pages" component={Pages} />
	<Route path="pages/:ID" component={Page} />
	<Route path="contents" component={Contents} />
	<Route path="settings" component={Settings} />
	<Route path="accountsettings" component={Settings} />
	<Route path="usersettings" component={Settings} />
	<Route path="feedback" component={Feedback} />
	<Route path="help" component={Help} />
	<Route path="accounts/:ID" component={Account}>
		<IndexRedirect to="/:ID" />
		<Redirect from="demands" to="/:ID/demands" />
		<Redirect from="offers" to="/:ID/offers" />
		<Redirect from="servicepacks" to="/:ID/servicepacks" />
	</Route>
	<Route path="(:ID/)demands" component={Demands} />
	<Route path="(:ID/)offers" component={Offers} />
	<Route path="(:ID/)servicepacks" component={ServicePacks} />
	<Route path=":ID" component={Account} />
	</Route>

export default routes
