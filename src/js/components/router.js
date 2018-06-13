import React  from "react"
import Router from "react-router/lib/Router"
import browserHistory from "react-router/lib/browserHistory"
import routes from "../routes"

const MyRouter = () => <Router routes={routes} history={browserHistory} />

export default MyRouter
