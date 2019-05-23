import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import RaisedButton from "material-ui/RaisedButton"
import TileUser from "./tileUser"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import DialogUserCreate from "../containers/dialogUserCreate"

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

// "usersDelete" is ready but not active.
class AccountSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogShow: false
		}
		this.dialogToggle = this.dialogToggle.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		const {
			account: {ID}, 
			usersGet
		} = this.props
		if (ID !== nextProps.account.ID)
			usersGet({
				URL:`/users?q=${ID}`, 
				key: ID
			})
	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
	}
	handleDelete() {
		const {
			userIDsSelected, 
			usersDelete
		}= this.props
		usersDelete({
			URL: `/users?IDs=${generateURLVariableFromIDs(userIDsSelected)}`, 
			data: {
				value: userIDsSelected
			}
		})
	}
	tilesUser(users) {
		const {
			userIDsSelected
		} = this.props
		return Object.entries(users).map(([k, v]) => <TileUser
			key={k} 
			user={v} 
			isChecked={userIDsSelected.indexOf(k) !== -1}
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
			users, 
			userIDsSelected
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
						<div>ACCOUNT INPUTS</div>
						{
							Object.keys(users).length && 
								<GridList 
									style={gridList}
									cols={4}
									padding={10}
									cellHeight={333}
								>
									{this.tilesUser(users)}
								</GridList>
						}
						{
							userIDsSelected.length > 0 && 
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
				<DialogUserCreate
					constexts={contexts} 
					title={contexts["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOQWRkIEEgTmV3IFVzZXIM"] || "Add A New User"}
					dialogShow={dialogShow} 
					dialogToggle={this.dialogToggle}
				/>
			</div>
		)
	}

}

AccountSettings.defaultProps = {
	contexts: {}, 
	account: {}, 
	users: {}
}

AccountSettings.propTypes = {
	contexts: PropTypes.object.isRequired, 
	account: PropTypes.object.isRequired, 
	usersGet: PropTypes.func.isRequired, 
	users: PropTypes.object.isRequired, 
	userIDsSelected: PropTypes.array, 
	usersDelete: PropTypes.func.isRequired
}

AccountSettings.muiName = "GridList"

export default AccountSettings
