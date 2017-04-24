import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import CounterChip from '../containers/counterChip'
import TimelineList from '../containers/timelineList'

const Timeline = () =>  (
	<div>
		<CounterChip/>
		<TimelineList/>
	</div>
)
export default muiThemeable()(Timeline)
