import React  from "react"
import {Router, browserHistory} from 'react-router'
import routes from '../routes'

const MyRouter = () => <Router routes={routes} history={browserHistory} />

export default MyRouter
