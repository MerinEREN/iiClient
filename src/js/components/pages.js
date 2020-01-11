import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import RaisedButton from "material-ui/RaisedButton"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import DialogPageCreate from "../containers/dialogPageCreate"
import TilePage from "../containers/tilePage"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContext: "space-around"
	}, 
	gridList: {
		margin: 0
	}, 
	raisedButton: {
		marginLeft: 12
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

// "pagesDelete" is ready but not in use.
class Pages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogShow: false
		}
		this.dialogToggle = this.dialogToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {
			pagesGet
		} = this.props
		pagesGet()
	}
	dialogToggle() {
		const {
			dialogShow
		} = this.state
		this.setState({dialogShow: !dialogShow})
	}
	handleDelete() {
		const {
			pageIDsSelected, 
			pagesDelete, 
			removeUpdateContextsWithThatPage
		}= this.props
		let URL = new URL(window.location.href)
		pageIDsSelected.forEach(([i, v]) => {
			if (i === 0)
				URL.searchParams.set("IDs", v)
			URL.searchParams.append("IDs", v)
		})
		pagesDelete({
			URL, 
			data: {
				value: pageIDsSelected
			}
		}).then(response => {
			if (response.ok)
				pageIDsSelected.forEach(v => 
					removeUpdateContextsWithThatPage(v)
				)
		})
	}
	tilesPage(pages) {
		const {
			pageIDsSelected
		} = this.props
		return Object.entries(pages).map(([k, v]) => <TilePage
			key={k} 
			page={v} 
			isChecked={pageIDsSelected.indexOf(k) !== -1}
		/>)
	}
	render() {
		const {
			root, 
			gridList, 
			raisedButton, 
			floatingActionButton
		} = styles
		const {
			dialogShow
		} = this.state
		const {
			contexts, 
			pages, 
			pageIDsSelected
		} = this.props
		return (
			<div style={root}>
				<GridList 
					cols={4} 
					cellHeight="auto"
					style={gridList}
				>
					<GridTile cols={1} />  
					<GridTile cols={2}>  
						{ 
							Object.keys(pages).length ? 
							<GridList 
								style={gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.tilesPage(pages)}
							</GridList> : 
							<h3>{contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"].value || "No Context"}</h3>
						}
						{
							pageIDsSelected.length > 0 && 
								<RaisedButton
									label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"].value || "Delete"}
									style={raisedButton}
									secondary={true}
									onTouchTap={this.handleDelete}
								/>
						}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				{
					!dialogShow && 
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.dialogToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<DialogPageCreate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOQWRkIEEgTmV3IFBhZ2UM"].value || "Add A New Page"}
					dialogShow={dialogShow} 
					dialogToggle={this.dialogToggle}
				/>
			</div>
		)
	}
}

Pages.defaultProps = {
	contexts: {}
}

Pages.propTypes = {
	contexts: PropTypes.object.isRequired, 
	pages: PropTypes.object, 
	pageIDsSelected: PropTypes.array, 
	pagesGet: PropTypes.func.isRequired, 
	pagesDelete: PropTypes.func.isRequired, 
	removeUpdateContextsWithThatPage: PropTypes.func.isRequired
}

Pages.muiName = "GridList"

export default Pages
