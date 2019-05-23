import React from "react"
import {GridList, GridTile} from "material-ui/GridList"
import ChipCounter from "../containers/chipCounter"
import ListTimeline from "../containers/listTimeline"

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
				<ChipCounter id={"timeline"} />
			</GridTile>
			<GridTile cols={2}>
				<ListTimeline/>
			</GridTile>
		</GridList>
	</div>
)

Timeline.muiName = "GridList"

export default Timeline
