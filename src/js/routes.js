import React from "react"
import Route from "react-router/lib/Route"
import IndexRoute from "react-router/lib/IndexRoute"
import Redirect from "react-router/lib/Redirect"
import IndexRedirect from "react-router/lib/IndexRedirect"
import Body from "./containers/body"
import Timeline from "./containers/timeline"
import LandingPage from "./containers/landingPage"
import Dashboard from "./components/dashboard"
import Languages from "./containers/languages"
import Pages from "./containers/pages"
import Page from "./containers/page"
import Contexts from "./containers/contexts"
import Tags from "./containers/tags"
import Roles from "./containers/roles"
import RoleTypes from "./containers/roleTypes"
import Account from "./components/account"
import Demands from "./components/demands"
import Offers from "./components/offers"
import ServicePacks from "./components/servicePacks"
import Settings from "./containers/settings"
import SettingsUser from "./containers/settingsUser"
import Demand from "./containers/demand"
import Offer from "./containers/offer"
import ServicePack from "./components/servicePack"
import Feedback from "./components/feedback"
import Help from "./components/help"

// AVOIDING GETTING ERROR WHEN RE-RENDERING BECAUSE OF muiTheme CHANGES !!!!!!!!!!!!!!!!!!!
// PRECEDENCE (matching routes in the order they are defined) IS IMPORTANT !!!!!!!!!!!!!!!!
// Add a control for path=":ID" 
// like onEnter={(nextState, replace) => {if (noMatch) replace("/")}}.
// "pID" is parent ID like account ID, demand ID etc.
const routes  = <Route path="/" component={Body}>
	<IndexRoute components={{landingPage: LandingPage, timeline: Timeline}} />
	<Route path="dashboard" component={Dashboard} />
	<Route path="languages" component={Languages} />
	<Route path="pages" component={Pages} />
	<Route path="pages/:ID" component={Page} />
	<Route path="contexts" component={Contexts} />
	<Route path="tags" component={Tags} />
	<Route path="roles" component={Roles} />
	<Route path="roleTypes" component={RoleTypes} />
	<Route path="settings" component={Settings} />
	<Route path="users/:ID" component={SettingsUser} />
	<Route path="demands/:ID" component={Demand} />
	<Route path=":pID/offers/:ID" component={Offer} />
	<Route path="servicePacks/:ID" component={ServicePack} />
	<Route path="feedback" component={Feedback} />
	<Route path="help" component={Help} />
	<Route path="accounts/:ID">
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
