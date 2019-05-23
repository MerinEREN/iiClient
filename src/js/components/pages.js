import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import RaisedButton from "material-ui/RaisedButton"
import TilePage from "./tilePage"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import DialogPageCreate from "../containers/dialogPageCreate"

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
		this.props.pagesGet()
	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
	}
	handleDelete() {
		const {
			pageIDsSelected, 
			pagesDelete
		}= this.props
		pagesDelete({
			URL: `/pages?IDs=${generateURLVariableFromIDs(pageIDsSelected)}`, 
			data: {
				value: pageIDsSelected
			}
		})
	}
	tilesPage(pages) {
		const {
			pageIDsSelected
		} = this.props
		return Object.entries(pages).map(([k, v]) => {
			return <TilePage
				key={k} 
				page={v} 
				isChecked={pageIDsSelected.indexOf(k) !== -1}
			/>
		})
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
							<h3>{contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Context"}</h3>
						}
						{
							pageIDsSelected.length > 0 && 
								<RaisedButton
									label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
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
					title={contexts["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOQWRkIEEgTmV3IFBhZ2UM"] || "Add A New Page"}
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
	pagesGet: PropTypes.func.isRequired, 
	pages: PropTypes.object, 
	pageIDsSelected: PropTypes.array, 
	pagesDelete: PropTypes.func.isRequired
}

Pages.muiName = "GridList"

export default Pages
