import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import TileRole from "./tileRole"
import DialogRoleCreate from "../containers/dialogRoleCreate"

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

class Roles extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogShow: false
		}
		this.dialogToggle = this.dialogToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.rolesGet()
	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
	}
	handleDelete(ID) {
		this.props.roleDelete({
			URL: `/roles/${ID}`, 
			data: {
				value: [ID]
			}
		})
	}
	tilesRole(roles) {
		const {
			contexts
		} = this.props
		return Object.entries(roles).map(([k, v]) => 
			<TileRole 
				key={k} 
				role={v} 
				name={contexts[v.contextID]}
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
			roles
		} = this.props
		return (
			<div style={root}>
				{ 
					Object.keys(roles).length ? 
					<GridList 
						style={gridList}
					>
						{this.tilesRole(roles)}
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
				<DialogRoleCreate
					contexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOQWRkIEEgTmV3IFJvbGUM"] || "Add A New Role"}
					dialogShow={dialogShow} 
					dialogToggle={this.dialogToggle}
				/>
			</div>
		)
	}
}

Roles.defaultProps = {
	contexts: {}
}

Roles.propTypes = {
	contexts: PropTypes.object.isRequired, 
	rolesGet: PropTypes.func.isRequired, 
	roles: PropTypes.object, 
	roleDelete: PropTypes.func.isRequired
}

Roles.muiName = "GridList"

export default Roles
