import React, {Component} from "react"
import PropTypes from "prop-types"
import {browserHistory} from "react-router"
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
			title: "", 
			inputErrText: {}
		}
		this.toggleDialog = this.toggleDialog.bind(this)
		this.handlePut = this.handlePut.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleRequiredInput = this.handleRequiredInput.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	componentWillMount() {
		const {getPage, params: {ID}} = this.props
		getPage({
			URL: `/pages/${ID}`
		})

	}
	handleRequiredInput(i) {
		switch (i) {
			case 1:
				if(!this.state.title) {
					this.setState({
						inputErrText:{
							title: "Required filed"
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
			title: value, 
			inputErrText: {[name]: ""}
		})
	}
	handlePut() {
		this.toggleDialog()
		const {title} = this.state
		const {putPage, params: {ID}, page} = this.props
		putPage({
			URL: `/pages/${ID}`, 
			body: {
				type: "FormData", 
				// Use "contentType" for "Blob" type.
				// contentType: "application/json", 
				data: {
					[ID]: {
						title: title.trim(), 
						file: this.file.files[0] 
					}
				}
			}
		})
		this.setState({title: ""})
	}
	handleDelete() {
		const {params: {ID}, deletePages} = this.props
		deletePages({
			URL: `/pages/${ID}`, 
			body: {
				data: [ID]
			}
		})
		browserHistory.goBack()
	}
	toggleDialog() {
		const {showDialog} = this.state
		this.setState({showDialog: !showDialog})
	}
	updatePageForm() {
		const {inputErrText, title} = this.state
		return (
			<VerticalStepper 
				stepLabels={[
					"Description", 
					"Page Title", 
					"Page Thumbnail"
				]} 
				stepContents={[
					<p>
						Change page attributes.
					</p>, 
					<TextField 
						name="title" 
						value={title}
						floatingLabelText="Page Title" 
						errorText={inputErrText.title}
						onChange={this.handleInputChange}
					/>, 
					<input 
						type="file"
						ref={input => this.file = input}
					/>
				]}
				setInputErrorMessage={this.handleRequiredInput}
			/>
		)
	}
	render() {
		const {showDialog} = this.state
		const {page} = this.props
		const actions = [
			<FlatButton
				label="Close"
				onClick={this.toggleDialog}
			/>, 
			<FlatButton
				label="Save"
				primary={true}
				onClick={this.handlePut}
			/>
		]
		return (
			<div style={styles.root}>
				<Card>
					<CardMedia>
						<img src={page.link || "/img/adele.jpg"} />
					</CardMedia>
					<CardTitle title={page.title} />
					<CardText>
						<List>
							<ListItem primaryText="Last Modified" secondaryText={page.lastModified} disabled={true} />
							<ListItem primaryText="Created" secondaryText={page.created} disabled={true} />
						</List>
					</CardText>
					<CardActions>
						<FlatButton 
							label="Delete" 
							secondary={true}
							onTouchTap={this.handleDelete} 
						/>
					</CardActions>
				</Card>
				<FloatingActionButton 
					secondary={true}
					style={{
						...styles.floatingActionButton, 
						display: showDialog ? "none" : "inline-block"
					}}
					onTouchTap={this.toggleDialog}
				>
					<ContentCreate />
				</FloatingActionButton>
				<Dialog
					title="Update The Page"
					children={this.updatePageForm()}
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
	page: {}
}

Page.propTypes = {
	page: PropTypes.object.isRequired, 
	getPage: PropTypes.func.isRequired, 
	putPage: PropTypes.func.isRequired, 
	deletePages: PropTypes.func.isRequired
}

export default Page
