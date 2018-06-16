import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap', 
		justifyContent: 'center'
	}, 
	gridList: {
		margin: 20
	}
}

const Dashboard = () => (
	<div style={styles.root}>
		<GridList 
			style={styles.gridList}
		>
			<GridTile cols={2}>
				<Chip>
					<Avatar size={32}>
						WD
					</Avatar>
					Web Development
				</Chip>
			</GridTile>
			<GridTile>
				<Chip>
					<Avatar size={32}>
						G
					</Avatar>
					Golang
				</Chip>
			</GridTile>
			<GridTile>
				<Chip>
					<Avatar size={32}>
						R
					</Avatar>
					React
				</Chip>
			</GridTile>
			<GridTile>
				<Chip>
					<Avatar size={32}>
						R
					</Avatar>
					Redux
				</Chip>
			</GridTile>
			<GridTile cols={2}>
				<Chip>
					<Avatar size={32}>
						GC
					</Avatar>
					Google Cloud
				</Chip>
			</GridTile>
			<GridTile cols={2}>
				<Chip>
					<Avatar size={32}>
						GAE
					</Avatar>
					Google App Engine
				</Chip>
			</GridTile>
		</GridList>
	</div>
)

export default Dashboard

