import React from 'react'
import {Provider} from 'react-redux'
import configureStore from '../store'
import Theme from '../containers/theme'
import DevTools from '../dev-tools'

const store = configureStore()

const Root = () => (
	<Provider store={store}>
		<div>
			<Theme />
			<DevTools />
		</div>
	</Provider>
)

export default Root
