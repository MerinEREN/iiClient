import React, {Component}  from 'react'
import {Provider} from 'react-redux'
import configureStore from '../store'
import Theme from '../containers/theme'

const store = configureStore()

const Root = () => (
	<Provider store={store}>
		<Theme />
	</Provider>
)

export default Root
