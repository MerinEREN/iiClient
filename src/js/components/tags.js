import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import TileTag from "./tileTag"
import DialogTagCreate from "../containers/dialogTagCreate"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "center"
	}, 
	gridList: {
		margin: 20
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

class Tags extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogShow: false
		}
		this.dialogToggle = this.dialogToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.tagsGet()
	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
	}
	handleDelete(ID) {
		this.props.tagDelete({
			URL: `/tags/${ID}`, 
			data: {
				value: [ID]
			}
		})
	}
	tilesTag(tags) {
		const {
			contexts
		} = this.props
		return Object.entries(tags).map(([k, v]) => 
			<TileTag 
				key={k} 
				tag={v} 
				text={contexts[v.contextID]}
				handleDelete={this.handleDelete}
			/>)
	}
	render() {
		const {
			root, 
			gridList, 
			floatingActionButton
		} = styles
		const {
			dialogShow
		} = this.state
		const {
			contexts, 
			tags
		} = this.props
		return (
			<div style={root}>
				{ 
					Object.keys(tags).length ? 
						<GridList 
							style={gridList}
						>
							{this.tilesTag(tags)}
						</GridList> : 
						<h3>{contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Content"}</h3>
				}
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
				<DialogTagCreate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINQWRkIEEgTmV3IFRhZww"] || "Add A New Tag"}
					dialogShow={dialogShow} 
					dialogToggle={this.dialogToggle}
				/>
			</div>
		)
	}
}

Tags.defaultProps = {
	contexts: {}
}

Tags.propTypes = {
	contexts: PropTypes.object.isRequired, 
	tagsGet: PropTypes.func.isRequired, 
	tags: PropTypes.object, 
	tagDelete: PropTypes.func.isRequired
}

Tags.muiName = "GridList"

export default Tags
