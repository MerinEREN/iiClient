import React from "react"
import {instanceOf} from "prop-types"
import {Cookies, withCookies} from "react-cookie"
import {Provider} from "react-redux"
import configureStore from "../store"
import DevTools from "../dev-tools"
import Theme from "../containers/theme"

const store = configureStore()

const StoreProvider = ({cookies}) => (
	<Provider store={store}>
		<div>
			<Theme cookies={cookies} />
			<DevTools />
		</div>
	</Provider>
)

StoreProvider.propTypes = {
	cookies: instanceOf(Cookies).isRequired 
}

export default withCookies(StoreProvider)
