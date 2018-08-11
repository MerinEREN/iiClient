import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import ContentTile from "../containers/contentTile"
import {generateURLVariableFromIDs} from "./utilities"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
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

class Contents extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			initNewContents: true, 
			newContents: {}, 
			inputErrTexts: {}
		}
		this.handleCreateNewContents = this.handleCreateNewContents.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handlePut = this.handlePut.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.getContents()
		this.props.getPages()
	}
	handleCreateNewContents() {
		const {
			newContents
		} = this.state
		let tempObj = {}
		for(let i = Object.keys(newContents).length; i < Object.keys(newContents).length + 8; i++) {
			tempObj[`newContent_${i}`] = {
						ID: `newContent_${i}`, 
						values: {}, 
						pageIDs: []
					}
			Object.keys(this.props.languages).forEach(
				v => tempObj[`newContent_${i}`].values[v] = ""
			)
		}
		this.setState({
			newContents: {
				...newContents, 
				...tempObj
			}
		})
	}
	handleUpdate(ID, field, value) {
		const {newContents, inputErrTexts} = this.state
		if (ID.indexOf("newContent") !== -1) {
			if (Array.isArray(value)) {
				this.setState({
					newContents: {
						...newContents, 
						[ID]: {
							...newContents[ID], 
							pageIDs: value
						}
					}
				})
			} else {
				this.setState({
					newContents: {
						...newContents, 
						[ID]: {
							...newContents[ID], 
							values: {
								...newContents[ID].values, 
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
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
		if(this.state.initNewContents) {
			this.handleCreateNewContents()
			this.setState({initNewContents: false})
		}
	}
	handleRequiredInput(contents) {
		const {
			contentsRoot
		} = this.props
		const {
			inputErrTexts
		} = this.state
		return Object.entries(contents).every(a => {
			// Not necessary for newContents but necessary for contents
			if(a[1].values["en-US"] === "") {
				this.setState({
					inputErrTexts: {
						...inputErrTexts, 
						[a[0]]: {
							...inputErrTexts[a[0]], 
							["en-US"]: contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"]
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
							pageIDs: contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"]
						}
					}
				})
				return false
			}
			return true
		})
	}
	handlePost() {
		let newContents = {}
		Object.entries(this.state.newContents).forEach( a => {
			if(a[1].values["en-US"] !== "")
				newContents[a[0]] = a[1]
		})
		if(Object.keys(newContents).length === 0) {
			this.toggleDialog()
			return
		}
		if(!this.handleRequiredInput(newContents))
			return
		this.toggleDialog()
		this.setState({
			initNewContents: true, 
			newContents: {}
		})
		this.props.postContents({
			body: {
				type: "Blob", 
				contentType: "application/json", 
				data: newContents
			}
		})
	}
	handlePut() {
		const {contents, putContents} = this.props
		if(!this.handleRequiredInput(contents))
			return
		putContents({
			body: {
				type: "Blob", 
				contentType: "application/json", 
				data: contents
			}
		})
	}
	handleDelete() {
		const {contentIDsSelected, deleteContents}= this.props
		deleteContents({
			URL: `/contents?IDs=${generateURLVariableFromIDs(contentIDsSelected)}`, 
			body: {
				data: contentIDsSelected
			}
		})
	}
	contentTiles(contents) {
		const {inputErrTexts} = this.state
		const {
			contentsRoot, 
			languages, 
			allPages, 
			contentIDsSelected
		} = this.props
		return Object.values(contents).map(v => <ContentTile 
			key={v.ID}
			contents={contentsRoot}
			languages={languages}
			allPages={allPages}
			content={v} 
			inputErrTexts={inputErrTexts[v.ID]} 
			isChecked={contentIDsSelected.indexOf(v.ID) !== -1}
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
			showDialog, 
			newContents
		} = this.state
		const {
			contentsRoot, 
			contents, 
			contentIDsSelected, 
			languages, 
			allPages
		} = this.props
		const children = <GridList 
					cols={4}
					style={gridList}
					padding={10}
					cellHeight={"auto"}
				>
					{this.contentTiles(newContents)}
				</GridList>
		const actions = [
			<FlatButton
				label={contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCQw"] || " "}
				onTouchTap={this.handleCreateNewContents}
			/>, 
			<FlatButton
				label={contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCww"] || " "}
				onTouchTap={this.toggleDialog}
			/>, 
			<FlatButton
				label={contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || " "}
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
						Object.keys(contents).length > 0 ? 
						<GridList 
							cols={4}
							style={gridList}
							padding={10}
							cellHeight={"auto"}
						>
							{this.contentTiles(contents)}
						</GridList> :
						<div>
							<h1>{contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI6lCgw"]}</h1>
							<h2>{contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI7VCww"]}</h2>
						</div>
					}
					{
						Object.keys(contents).length > 0
							&& 
							<RaisedButton
								label={contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || " "}
								style={raisedButton}
								primary={true}
								onTouchTap={this.handlePut}
							/>
					}
					{
							contentIDsSelected.length > 0 && 
							<RaisedButton
								label={contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCAw"] || " "}
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
						Object.keys(allPages).length > 0 && 
						!showDialog
					) &&
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.toggleDialog}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Dialog
					title={contentsRoot["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCgw"]}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
					autoScrollBodyContent={true}
				/>
			</div>
		)
	}
}

Contents.defaultProps = {
	contentsRoot: {}, 
	contents: {}
}

Contents.propTypes = {
	contentsRoot: PropTypes.object.isRequired, 
	languages: PropTypes.object.isRequired, 
	getContents: PropTypes.func.isRequired, 
	contents: PropTypes.object.isRequired, 
	getPages: PropTypes.func.isRequired, 
	allPages: PropTypes.object.isRequired, 
	postContents: PropTypes.func.isRequired, 
	putContents: PropTypes.func.isRequired, 
	contentIDsSelected: PropTypes.array.isRequired, 
	deleteContents: PropTypes.func.isRequired
}

Contents.muiName = "GridList"

export default Contents
