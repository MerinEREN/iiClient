import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import TileRoleType from "./tileRoleType"
import DialogRoleTypeCreate from "../containers/dialogRoleTypeCreate"

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

class RoleTypes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogShow: false
		}
		this.dialogToggle = this.dialogToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.roleTypesGet()
	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
	}
	handleDelete(ID) {
		this.props.roleTypeDelete({
			URL: `/roleTypes/${ID}`, 
			data: {
				value: [ID]
			}
		})
	}
	tilesRoleType(roleTypes) {
		return Object.entries(roleTypes).map(([k, v]) => 
			<TileRoleType 
				key={k} 
				roleType={v} 
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
			roleTypes
		} = this.props
		return (
			<div style={root}>
				{ 
					Object.keys(roleTypes).length ? 
					<GridList 
						style={gridList}
					>
						{this.tilesRoleType(roleTypes)}
					</GridList> : 
					<h3>{contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Context"}</h3>
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
				<DialogRoleTypeCreate
					contexts={contexts}
					title={contexts["aghkZXZ-Tm9uZXIgCxIHQ29udGVudCITQWRkIEEgTmV3IFJvbGUgVHlwZQw"] || "Add A New Role Type"}
					dialogShow={dialogShow} 
					dialogToggle={this.dialogToggle}
				/>
			</div>
		)
	}
}

RoleTypes.defaultProps = {
	contexts: {}
}

RoleTypes.propTypes = {
	contexts: PropTypes.object.isRequired, 
	roleTypesGet: PropTypes.func.isRequired, 
	roleTypes: PropTypes.object, 
	roleTypeDelete: PropTypes.func.isRequired
}

RoleTypes.muiName = "GridList"

export default RoleTypes
