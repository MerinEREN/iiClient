import React, {Component} from "react"
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"
import PageTile from "./pageTile"
import {generateURLVariableFromIDs} from "./utilities"
import {trimSpace} from "../middlewares/utilities"

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

// "deletePages" is ready but not in use.
class Pages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDialog: false, 
			stepIndex: 0, 
			text: "", 
			inputErrTexts: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handleStepIndex = this.handleStepIndex.bind(this)
		this.handleFieldChange = this.handleFieldChange.bind(this)
		this.handlePost = this.handlePost.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		this.props.getPages()
	}
	handleStepIndex(direction) {
		const {stepIndex} = this.state
		switch (direction) {
			case "next":
				if(this.handleRequiredField(stepIndex))
					return
				this.setState({
					stepIndex: stepIndex + 1,
				})
				break
			case "prev":
				this.setState({
					stepIndex: stepIndex - 1,
				})
				break
		}
	}
	handleRequiredField(i) {
		const {
			text, 
			inputErrTexts
		} = this.state
		const {
			contents
		} = this.props
		switch (i) {
			case 1:
				if(!text) {
					this.setState({
						inputErrTexts: {
							...inputErrTexts, 
							text: contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaNCgw"] || "Required field" 
						}
					})
					return true
				}
				return false
			default:
				return false
		}
	}
	handleFieldChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
		const {
			text, 
			inputErrTexts
		} = this.state
		this.setState({
			text: value, 
			inputErrTexts: {
				...inputErrTexts, 
				[name]: ""
			}
		})
	}
	handlePost() {
		this.toggleDialog()
		const {text} = this.state
		this.props.postPage({
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[trimSpace(text)]: {
						text: text.trim(), 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({text: "", stepIndex: 0})
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	handleDelete() {
		const {
			pageIDsSelected, 
			deletePages
		}= this.props
		deletePages({
			URL: `/pages?IDs=${generateURLVariableFromIDs(pageIDsSelected)}`, 
			body: {
				data: pageIDsSelected
			}
		})
	}
	pageTiles(pages) {
		return Object.entries(pages).map(([k, v]) => {
			return <PageTile
				key={k} 
				page={v} 
				isChecked={this.props.pageIDsSelected.indexOf(k) !== -1}
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
			showDialog, 
			stepIndex, 
			text, 
			inputErrTexts
		} = this.state
		const {
			contents, 
			pages, 
			pageIDsSelected
		} = this.props
		const stepLabels = Object.keys(contents).length > 0 ?
			[
				contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbDCAw"], 
				contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI7lCAw"], 
				contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI7lCgw"]
			] :
			[
				"Description", 
				"Name", 
				"File"
			]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLaDCAw"] || "Add a new page. Name field is required."}
			</p>, 
			<TextField 
				name="text" 
				value={text}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI7lCAw"] || "Name"}
				errorText={inputErrTexts.text}
				onChange={this.handleFieldChange}
			/>, 
			<input 
				type="file"
				ref={input => this.file = input}
			/>
		]
		const children = <VerticalStepper 
			stepLabels={stepLabels} 
			stepContents={stepContents}
			stepIndex={stepIndex}
			updateStepIndex={this.handleStepIndex}
			contents={contents}
		/>
		const actions = [
			<FlatButton
				label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCww"] || "Close"}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLbNCww"] || "Save"}
			primary={true}
			onTouchTap={this.handlePost}
		/>)
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
							Object.keys(pages).length !== 0 
							? 
							<GridList 
								style={gridList}
								cols={4}
								padding={10}
								cellHeight={333}
							>
								{this.pageTiles(pages)}
							</GridList>
							:
							<h3>{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI6lCgw"] || "No Content"}</h3>
						}
						{
							pageIDsSelected.length > 0 && 
								<RaisedButton
									label={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLatCAw"] || "Delete"}
									style={raisedButton}
									secondary={true}
									onTouchTap={this.handleDelete}
								/>
						}
					</GridTile>
					<GridTile cols={1} />  
				</GridList>
				{
					!showDialog && 
						<FloatingActionButton 
							secondary={true}
							style={floatingActionButton}
							onTouchTap={this.toggleDialog}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<Dialog
					title={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI6VCAw"] || "Add a page"}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

Pages.defaultProps = {
	contents: {}
}

Pages.propTypes = {
	contents: PropTypes.object.isRequired, 
	getPages: PropTypes.func.isRequired, 
	pages: PropTypes.object.isRequired, 
	postPage: PropTypes.func.isRequired, 
	pageIDsSelected: PropTypes.array.isRequired, 
	deletePages: PropTypes.func.isRequired
}

Pages.muiName = "GridList"

export default Pages
