import React, {Component} from "react"
import PropTypes from "prop-types"
import browserHistory from "react-router/lib/browserHistory"
import {Card, CardActions, CardMedia, CardTitle, CardText} from "material-ui/Card"
import {List, ListItem} from "material-ui/List"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentCreate from "material-ui/svg-icons/content/create"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import VerticalStepper from "./verticalStepper"
import TextField from "material-ui/TextField"

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap", 
		justifyContent: "space-around"
	}, 
	link: {
		activeStyle: {
			color: "#0097a7"
		}
	}, 
	floatingActionButton: {
		position: "fixed",
		bottom: 32, 
		right: 48
	}
}

// Show and modify all stored page properties, and also delete page.
// Link to the corresponding page contents.
class Page extends Component {
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
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handlePut = this.handlePut.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	componentWillMount() {
		const {getPage, params: {ID}} = this.props
		getPage({
			URL: `/pages/${ID}`
		})

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
			contents
		} = this.props
		switch (i) {
			case 1:
				if(!this.state.text) {
					this.setState({
						inputErrTexts:{
							...this.state.inputErrTexts, 
							text: contents["aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOUmVxdWlyZWQgRmllbGQM"] || "Required Field"
						}
					})
					return true
				}
				return false
			default:
				return false
		}
	}
	handleInputChange(event) {
		const target = event.target
		const name = target.name
		const value = target.value
		this.setState({
			text: value, 
			inputErrTexts: {
				...this.state.inputErrTexts, 
				[name]: null
			}
		})
	}
	handlePut() {
		this.toggleDialog()
		const {text} = this.state
		const {putPage, params: {ID}, page} = this.props
		putPage({
			URL: `/pages/${ID}`, 
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[ID]: {
						text: text.trim(), 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({text: "", stepIndex: 0})
	}
	handleDelete() {
		const {
			params: {ID}, 
			deletePages, 
			removeUpdateContentsWithThatPage
		} = this.props
		deletePages({
			URL: `/pages/${ID}`, 
			body: {
				data: [ID]
			}
		}).then(response => {
			if (response.ok)
				removeUpdateContentsWithThatPage(ID)
		})
		browserHistory.goBack()
	}
	toggleDialog() {
		this.setState({showDialog: !this.state.showDialog})
	}
	render() {
		const {
			showDialog, 
			stepIndex, 
			text, 
			inputErrTexts
		} = this.state
		const {
			contents, 
			page
		} = this.props
		const stepLabels = Object.keys(contents).length > 0 ?
			[
				contents["aghkZXZ-Tm9uZXIYCxIHQ29udGVudCILRGVzY3JpcHRpb24M"], 
				contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmFtZQw"], 
				contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIERmlsZQw"]
			] :
			[
				"Description", 
				"Name", 
				"File"
			]
		const stepContents = [
			<p>
				{contents["aghkZXZ-Tm9uZXIxCxIHQ29udGVudCIkVXBkYXRlIHBhZ2UsIG5hbWUgZmllbGQgaXMgcmVxdWlyZWQuDA"] || "Update page, name field is required."}
			</p>, 
			<TextField 
				name="text" 
				value={text}
				floatingLabelText={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIETmFtZQw"] || "Name"}
				errorText={inputErrTexts.text}
				onChange={this.handleInputChange}
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
				label={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFQ2xvc2UM"] || "Close"}
				onTouchTap={this.toggleDialog}
			/>
		]
		stepContents.length - 1 === stepIndex && actions.push(<FlatButton
			label={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEU2F2ZQw"] || "Save"}
			primary={true}
			onTouchTap={this.handlePut}
		/>)
		return (
			<div style={styles.root}>
				<Card>
					<CardMedia>
						<img src={page.link || "/img/adele.jpg"} />
					</CardMedia>
					<CardTitle title={page.text} />
					<CardText>
						<List>
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITW9kaWZpZWQM"] || "Modified"} secondaryText={page.lastModified} disabled={true} />
							<ListItem primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHQ3JlYXRlZAw"] || "Created"} secondaryText={page.created} disabled={true} />
						</List>
					</CardText>
					<CardActions>
						<FlatButton 
							label={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGRGVsZXRlDA"] || "Delete"}
							secondary={true}
							onTouchTap={this.handleDelete} 
						/>
					</CardActions>
				</Card>
				{
					!showDialog 
						&& 
						<FloatingActionButton 
							secondary={true}
							style={styles.floatingActionButton}
							onTouchTap={this.toggleDialog}
						>
							<ContentCreate />
						</FloatingActionButton>
				}
				<Dialog
					title={contents["aghkZXZ-Tm9uZXIcCxIHQ29udGVudCIPVXBkYXRlIFRoZSBQYWdlDA"] || "Update The Page"}
					children={children}
					actions={actions}
					modal={true}
					open={showDialog} 
				/>
			</div>
		)
	}
}

// For "undefined required page" error when refreshing the page.
Page.defaultProps = {
	contents: {}, 
	page: {}
}

Page.propTypes = {
	contents: PropTypes.object.isRequired, 
	page: PropTypes.object.isRequired, 
	getPage: PropTypes.func.isRequired, 
	putPage: PropTypes.func.isRequired, 
	deletePages: PropTypes.func.isRequired, 
	removeUpdateContentsWithThatPage: PropTypes.func.isRequired
}

export default Page
