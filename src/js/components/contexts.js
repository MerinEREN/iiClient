import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import TileContext from "../containers/tileContext"

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

class Contexts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogShow: false, 
			newContextsInit: true, 
			newContexts: {}, 
			inputErrTexts: {}
		}
		this.handleCreateNewContexts = this.handleCreateNewContexts.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.dialogToggle = this.dialogToggle.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handlePut = this.handlePut.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.contextsGet()
		this.props.pagesGet()
	}
	handleCreateNewContexts() {
		const {
			newContexts
		} = this.state
		let tempObj = {}
		for(let i = Object.keys(newContexts).length; i < Object.keys(newContexts).length + 8; i++) {
			tempObj[`newContext_${i}`] = {
						ID: `newContext_${i}`, 
						values: {}, 
						pageIDs: []
					}
			Object.keys(this.props.languages).forEach(
				v => tempObj[`newContext_${i}`].values[v] = ""
			)
		}
		this.setState({
			newContexts: {
				...newContexts, 
				...tempObj
			}
		})
	}
	handleUpdate(ID, field, value) {
		const {
			newContexts, 
			inputErrTexts
		} = this.state
		if (ID.indexOf("newContext") !== -1) {
			if (Array.isArray(value)) {
				this.setState({
					newContexts: {
						...newContexts, 
						[ID]: {
							...newContexts[ID], 
							pageIDs: value
						}
					}
				})
			} else {
				this.setState({
					newContexts: {
						...newContexts, 
						[ID]: {
							...newContexts[ID], 
							values: {
								...newContexts[ID].values, 
								[field]: value
							}
						}
					}
				})
			}
		}
		this.setState({
			inputErrTexts: {
				...inputErrTexts, 
				[ID]: {
					...inputErrTexts[ID], 
					[field]: ""
				}
			}
		})
	}
	dialogToggle() {
		this.setState({dialogShow: !this.state.dialogShow})
		if(this.state.newContextsInit) {
			this.handleCreateNewContexts()
			this.setState({newContextsInit: false})
		}
	}
	handleRequiredField(contexts) {
		const {
			contextsRoot
		} = this.props
		const {
			inputErrTexts
		} = this.state
		return Object.entries(contexts).every(a => {
			// Not necessary for newContexts but necessary for contexts
			if(a[1].values["en-US"] === "") {
				this.setState({
					inputErrTexts: {
						...inputErrTexts, 
						[a[0]]: {
							...inputErrTexts[a[0]], 
							["en-US"]: contextsRoot["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
						}
					}
				})
				return false
			}
			if(a[1].pageIDs.length === 0) {
				this.setState({
					inputErrTexts: {
						...inputErrTexts, 
						[a[0]]: {
							...inputErrTexts[a[0]], 
							pageIDs: contextsRoot["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
						}
					}
				})
				return false
			}
			return true
		})
	}
	handlePost() {
		let newContexts = {}
		Object.entries(this.state.newContexts).forEach( a => {
			if(a[1].values["en-US"] !== "")
				newContexts[a[0]] = a[1]
		})
		if(Object.keys(newContexts).length === 0) {
			this.dialogToggle()
			return
		}
		if(!this.handleRequiredField(newContexts))
			return
		this.dialogToggle()
		this.setState({
			newContextsInit: true, 
			newContexts: {}
		})
		this.props.contextsPost({
			data: {
				type: "Blob", 
				contentType: "application/json", 
				value: newContexts
			}
		})
	}
	handlePut() {
		const {
			contexts, 
			contextsPut
		} = this.props
		if(!this.handleRequiredField(contexts))
			return
		contextsPut({
			data: {
				type: "Blob", 
				contentType: "application/json", 
				value: contexts
			}
		})
	}
	handleDelete() {
		const {
			contextIDsSelected, 
			contextsDelete
		} = this.props
		// CREATE URL HERE AND USE IT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		contextsDelete({
			URL, 
			data: {
				value: contextIDsSelected
			}
		})
	}
	tilesContext(contexts) {
		const {
			inputErrTexts
		} = this.state
		const {
			contextsRoot, 
			languages, 
			pages, 
			contextIDsSelected
		} = this.props
		return Object.values(contexts).map(v => <TileContext 
			key={v.ID}
			contextsRoot={contextsRoot}
			languages={languages}
			pages={pages}
			context={v} 
			inputErrTexts={inputErrTexts[v.ID]} 
			isChecked={contextIDsSelected.indexOf(v.ID) !== -1}
			handleUpdate={this.handleUpdate} 
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
			dialogShow, 
			newContexts
		} = this.state
		const {
			contextsRoot, 
			contexts, 
			contextIDsSelected, 
			languages, 
			pages
		} = this.props
		const children = <GridList 
					cols={4}
					style={gridList}
					padding={10}
					cellHeight={"auto"}
				>
					{this.tilesContext(newContexts)}
				</GridList>
		const actions = [
			<FlatButton
				label={contextsRoot["aghkZXZ-Tm9uZXIiCxIHQ29udGVudCIVR2VuZXJhdGUgTmV3IENvbnRlbnRzDA"] || "Generate New Contexts"}
				onTouchTap={this.handleCreateNewContexts}
			/>, 
			<FlatButton
				label={contextsRoot["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
				onTouchTap={this.dialogToggle}
			/>, 
			<FlatButton
				label={contextsRoot["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
				primary={true}
				onTouchTap={this.handlePost}
			/>
		]
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
						Object.keys(contexts).length > 0 ? 
						<GridList 
							cols={4}
							style={gridList}
							padding={10}
							cellHeight={"auto"}
						>
							{this.tilesContext(contexts)}
						</GridList> :
						<div>
							<h3>{contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Context"}</h3>
						</div>
					}
					{
						Object.keys(contexts).length > 0
							&& 
							<RaisedButton
								label={contextsRoot["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
								style={raisedButton}
								primary={true}
								onTouchTap={this.handlePut}
							/>
					}
					{
							contextIDsSelected.length > 0 && 
							<RaisedButton
								label={contextsRoot["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
								style={raisedButton}
								secondary={true}
								onTouchTap={this.handleDelete}
							/>
					}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				{ 
					(
						Object.keys(languages).length > 0 && 
						Object.keys(pages).length > 0 && 
						!dialogShow
					) &&
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.dialogToggle}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Dialog
					title={contextsRoot["aghkZXZ-Tm9uZXIdCxIHQ29udGVudCIQQWRkIE5ldyBDb250ZW50cww"] || "Add New Contexts"}
					children={children}
					actions={actions}
					modal={true}
					open={dialogShow} 
					autoScrollBodyContext={true}
				/>
			</div>
		)
	}
}

Contexts.defaultProps = {
	contextsRoot: {}, 
	contexts: {}, 
	languages: {}, 
	pages: {}
}

Contexts.propTypes = {
	languages: PropTypes.object.isRequired, 
	contextsRoot: PropTypes.object.isRequired, 
	contextsGet: PropTypes.func.isRequired, 
	contexts: PropTypes.object.isRequired, 
	pagesGet: PropTypes.func.isRequired, 
	pages: PropTypes.object.isRequired, 
	postContexts: PropTypes.func.isRequired, 
	putContexts: PropTypes.func.isRequired, 
	contextIDsSelected: PropTypes.array.isRequired, 
	deleteContexts: PropTypes.func.isRequired
}

Contexts.muiName = "GridList"

export default Contexts
