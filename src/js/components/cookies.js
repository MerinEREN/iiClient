import React from "react"
import {CookiesProvider} from 'react-cookie'
import StoreProvider from './storeProvider'

const CookieMonsters = () => (
	<CookiesProvider>
		<StoreProvider />
	</CookiesProvider>
)

export default CookieMonsters
