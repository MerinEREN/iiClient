import React from "react"
import {GridList, GridTile} from "material-ui/GridList"
import CounterChip from "../containers/counterChip"
import TimelineList from "../containers/timelineList"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	gridList: {
		margin: 0
	}
}

const Timeline = () =>  (
	<div style={styles.root}>
		<GridList 
			cellHeight="auto"
			style={styles.gridList}
		>
			<GridTile cols={2}>
				<CounterChip id={"timeline"} />
			</GridTile>
			<GridTile cols={2}>
				<TimelineList/>
			</GridTile>
		</GridList>
	</div>
)

Timeline.muiName = "GridList"

export default Timeline
